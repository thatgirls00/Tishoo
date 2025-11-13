package org.example.tishoo.domain.payment.dto;

public record ConfirmPaymentRequest(
        String paymentKey,
        String orderId,
        String amount
) {}