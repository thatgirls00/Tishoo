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
import org.example.tishoo.domain.project.service.ProjectMemberService;
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
    private final ProjectMemberService projectMemberService;

    private byte[] uuidToBytes(UUID uuid) {
        ByteBuffer bb = ByteBuffer.wrap(new byte[16]);
        bb.putLong(uuid.getMostSignificantBits());
        bb.putLong(uuid.getLeastSignificantBits());
        return bb.array();
    }

    public ConfirmPaymentResponse confirmPayment(ConfirmPaymentRequest request) throws Exception {

        // 토스 페이먼츠 실제 연동 없이 바로 DB에 저장 (테스트용)
        // 실제 토스 API 호출 없이 더미 데이터로 결제 완료 처리
        try {
            // 요청에서 받은 데이터 사용 (토스 API 응답 대신)
            String paymentKey = request.paymentKey();
            String tossOrderId = request.orderId();
            long totalAmount = Long.parseLong(request.amount());
            
            // 기본값 설정 (토스 API 응답 없이)
            TossPaymentMethod method = TossPaymentMethod.카드; // 기본값: 카드
            TossPaymentStatus status = TossPaymentStatus.DONE;
            
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime requestedAt = now.minusMinutes(1); // 1분 전
            LocalDateTime approvedAt = now; // 현재 시간

            // Order 엔티티 조회 또는 생성
            // orderId가 UUID 형식이 아니면 새로 생성
            byte[] orderIdBytes;
            try {
                UUID orderUuid = UUID.fromString(request.orderId());
                orderIdBytes = uuidToBytes(orderUuid);
            } catch (IllegalArgumentException e) {
                // UUID 형식이 아니면 랜덤 UUID 생성
                orderIdBytes = uuidToBytes(UUID.randomUUID());
            }

            // effectively final을 위한 복사 (람다 표현식에서 사용하기 위해)
            final byte[] finalOrderIdBytes = orderIdBytes;
            Order order = orderRepository.findById(orderIdBytes)
                    .orElseGet(() -> orderRepository.save(
                            Order.builder().orderId(finalOrderIdBytes).build()
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

            // 결제 완료 후 프로젝트 참여 자동 등록 (200 응답 후 DB 저장)
            if (request.projectId() != null && request.menteeId() != null) {
                try {
                    // 프로젝트 멤버 추가 (트랜잭션 내에서 실행)
                    projectMemberService.addMember(request.projectId(), request.menteeId());
                    System.out.println("✅ 결제 완료 후 프로젝트 멤버 추가 성공: projectId=" + request.projectId() + ", menteeId=" + request.menteeId());
                    
                    // 추가 확인: 실제로 DB에 저장되었는지 검증
                    boolean exists = projectMemberService.existsByProjectIdAndUserId(request.projectId(), request.menteeId());
                    if (exists) {
                        System.out.println("✅ 프로젝트 멤버 DB 저장 확인 완료: projectId=" + request.projectId() + ", menteeId=" + request.menteeId());
                    } else {
                        System.err.println("❌ 프로젝트 멤버 DB 저장 확인 실패: projectId=" + request.projectId() + ", menteeId=" + request.menteeId());
                        throw new BusinessException("프로젝트 멤버 저장 확인 실패");
                    }
                } catch (Exception e) {
                    // 프로젝트 참여 등록 실패 시 예외를 다시 던져서 트랜잭션 롤백
                    System.err.println("❌ 프로젝트 참여 등록 실패: " + e.getMessage());
                    e.printStackTrace();
                    throw new BusinessException("프로젝트 참여 등록 실패: " + e.getMessage());
                }
            } else {
                System.err.println("⚠️ 결제 완료했지만 projectId 또는 menteeId가 null입니다. projectId=" + request.projectId() + ", menteeId=" + request.menteeId());
                throw new BusinessException("프로젝트 ID 또는 멘티 ID가 없습니다.");
            }

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
            // DB 저장 실패 시 에러 로그만 남기고 예외 던지기 (토스 API 호출 없음)
            System.err.println("❌ 결제 정보 DB 저장 실패: " + e.getMessage());
            e.printStackTrace();
            throw new BusinessException("결제 정보 저장 중 오류가 발생했습니다: " + e.getMessage());
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