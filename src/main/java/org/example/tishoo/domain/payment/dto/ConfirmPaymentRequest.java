package org.example.tishoo.domain.payment.dto;

public record ConfirmPaymentRequest(
        String paymentKey,
        String orderId,
        String amount,
        Long projectId,  // 프로젝트 ID
        Long menteeId    // 멘티 ID
) {}