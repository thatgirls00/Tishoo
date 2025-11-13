package org.example.tishoo.domain.payment.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.order.entity.Order;
import org.example.tishoo.domain.order.repository.OrderRepository;
import org.example.tishoo.domain.payment.client.TossPaymentClient;
import org.example.tishoo.domain.payment.dto.CancelPaymentRequest;
import org.example.tishoo.domain.payment.dto.ConfirmPaymentRequest;
import org.example.tishoo.domain.payment.dto.ConfirmPaymentResponse;
import org.example.tishoo.domain.payment.entity.TossPayment;
import org.example.tishoo.domain.payment.entity.TossPaymentMethod;
import org.example.tishoo.domain.payment.entity.TossPaymentStatus;
import org.example.tishoo.domain.payment.repository.TossPaymentRepository;
import org.example.tishoo.global.exception.BusinessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.http.HttpResponse;
import java.nio.ByteBuffer;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class TossPaymentService {

    private final TossPaymentRepository tossPaymentRepository;
    private final OrderRepository orderRepository;
    private final TossPaymentClient tossPaymentClient;
    private final ObjectMapper objectMapper;

    private byte[] uuidToBytes(UUID uuid) {
        ByteBuffer bb = ByteBuffer.wrap(new byte[16]);
        bb.putLong(uuid.getMostSignificantBits());
        bb.putLong(uuid.getLeastSignificantBits());
        return bb.array();
    }

    public ConfirmPaymentResponse confirmPayment(ConfirmPaymentRequest request) throws Exception {

        HttpResponse<String> response = tossPaymentClient.requestConfirm(request);

        if (response.statusCode() != 200) {
            throw new BusinessException("토스 결제 승인 실패: " + response.body());
        }

        try {
            // JSON 파싱
            JsonNode root = objectMapper.readTree(response.body());

            String paymentKey = root.get("paymentKey").asText();
            String tossOrderId = root.get("orderId").asText();
            long totalAmount = root.get("totalAmount").asLong();
            String methodStr = root.get("method").asText(); // 카드, 가상계좌 등

            TossPaymentMethod method = TossPaymentMethod.valueOf(methodStr);
            TossPaymentStatus status = TossPaymentStatus.DONE;

            LocalDateTime requestedAt = LocalDateTime.parse(root.get("requestedAt").asText().substring(0, 19));
            LocalDateTime approvedAt = LocalDateTime.parse(root.get("approvedAt").asText().substring(0, 19));

            // Order 엔티티 조회 또는 생성 (예시: orderId = UUID 기반)
            UUID orderUuid = UUID.fromString(request.orderId());
            byte[] orderIdBytes = uuidToBytes(orderUuid);

            Order order = orderRepository.findById(orderIdBytes)
                    .orElseGet(() -> orderRepository.save(
                            Order.builder().orderId(orderIdBytes).build()
                    ));

            // TossPayment 저장
            TossPayment payment = TossPayment.builder()
                    .paymentId(uuidToBytes(UUID.randomUUID()))
                    .tossPaymentKey(paymentKey)
                    .tossOrderId(tossOrderId)
                    .order(order)
                    .totalAmount(totalAmount)
                    .tossPaymentMethod(method)
                    .tossPaymentStatus(status)
                    .requestedAt(requestedAt)
                    .approvedAt(approvedAt)
                    .build();

            tossPaymentRepository.save(payment);

            return new ConfirmPaymentResponse(
                    payment.getTossPaymentKey(),
                    payment.getTossOrderId(),
                    payment.getTotalAmount(),
                    payment.getTossPaymentMethod(),
                    payment.getTossPaymentStatus(),
                    payment.getRequestedAt(),
                    payment.getApprovedAt()
            );

        } catch (Exception e) {
            // DB 저장 실패 시 결제 취소 요청
            HttpResponse<String> cancelResponse =
                    tossPaymentClient.requestPaymentCancel(request.paymentKey(), "DB 저장 실패로 인한 결제 취소");

            throw new BusinessException("결제는 되었지만 내부 오류로 취소되었습니다. " + cancelResponse.body());
        }
    }

    @Transactional(readOnly = true)
    public ConfirmPaymentResponse getPayment(String backendOrderId) {
        UUID uuid = UUID.fromString(backendOrderId);
        byte[] orderIdBytes = uuidToBytes(uuid);

        Order order = orderRepository.findById(orderIdBytes)
                .orElseThrow(() -> new BusinessException("해당 주문을 찾을 수 없습니다."));

        TossPayment payment = tossPaymentRepository.findByOrder(order)
                .orElseThrow(() -> new BusinessException("결제 정보를 찾을 수 없습니다."));

        return new ConfirmPaymentResponse(
                payment.getTossPaymentKey(),
                payment.getTossOrderId(),
                payment.getTotalAmount(),
                payment.getTossPaymentMethod(),
                payment.getTossPaymentStatus(),
                payment.getRequestedAt(),
                payment.getApprovedAt()
        );
    }

    public void changePaymentStatus(String paymentKey, TossPaymentStatus newStatus) {
        TossPayment payment = tossPaymentRepository.findByTossPaymentKey(paymentKey)
                .orElseThrow(() -> new BusinessException("결제 정보를 찾을 수 없습니다."));

        payment.setTossPaymentStatus(newStatus);
    }

    public void cancelPayment(CancelPaymentRequest request) throws IOException, InterruptedException {
        HttpResponse<String> response =
                tossPaymentClient.requestPaymentCancel(request.paymentKey(), request.cancelReason());

        if (response.statusCode() == 200) {
            changePaymentStatus(request.paymentKey(), TossPaymentStatus.CANCELED);
        } else {
            throw new BusinessException("결제 취소 실패: " + response.body());
        }
    }
}