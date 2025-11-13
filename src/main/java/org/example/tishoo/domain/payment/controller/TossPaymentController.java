package org.example.tishoo.domain.payment.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.payment.dto.*;
import org.example.tishoo.domain.payment.service.TossPaymentService;
import org.example.tishoo.global.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments/toss")
@RequiredArgsConstructor
public class TossPaymentController {

    private final TossPaymentService tossPaymentService;

    /**
     * 결제의 금액을 세션에 임시 저장
     * 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도
     */
    @PostMapping("/saveAmount")
    public ResponseEntity<ApiResponse<String>> tempSaveAmount(
            HttpSession session,
            @RequestBody SaveAmountRequest saveAmountRequest
    ) {
        session.setAttribute(saveAmountRequest.orderId(), saveAmountRequest.amount());
        return ResponseEntity.ok(ApiResponse.success("Payment temp save successful"));
    }

    /**
     * 결제 금액을 검증
     */
    @PostMapping("/verifyAmount")
    public ResponseEntity<?> verifyAmount(
            HttpSession session,
            @RequestBody SaveAmountRequest saveAmountRequest
    ) {
        String amount = (String) session.getAttribute(saveAmountRequest.orderId());

        if (amount == null || !amount.equals(saveAmountRequest.amount())) {
            return ResponseEntity.badRequest().body(
                    PaymentErrorResponse.builder()
                            .code(400)
                            .message("결제 금액 정보가 유효하지 않습니다.")
                            .build()
            );
        }

        session.removeAttribute(saveAmountRequest.orderId());

        return ResponseEntity.ok(ApiResponse.success("Payment is valid"));
    }

    /**
     * 토스에 결제 승인 받기
     */
    @PostMapping("/confirm")
    public ResponseEntity<ApiResponse<ConfirmPaymentResponse>> confirmPayment(
            @RequestBody ConfirmPaymentRequest confirmPaymentRequest
    ) throws Exception {

        ConfirmPaymentResponse response = tossPaymentService.confirmPayment(confirmPaymentRequest);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * Order 테이블의 ID로 결제정보를 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ConfirmPaymentResponse>> getPayment(
            @PathVariable("id") String backendOrderId
    ) {
        ConfirmPaymentResponse payment = tossPaymentService.getPayment(backendOrderId);
        return ResponseEntity.ok(ApiResponse.success(payment));
    }

    /**
     * 결제 취소
     */
    @PostMapping("/cancel")
    public ResponseEntity<ApiResponse<String>> cancelPayment(
            @RequestBody CancelPaymentRequest cancelPaymentRequest
    ) throws Exception {

        tossPaymentService.cancelPayment(cancelPaymentRequest);
        return ResponseEntity.ok(ApiResponse.success("결제가 취소되었습니다."));
    }
}