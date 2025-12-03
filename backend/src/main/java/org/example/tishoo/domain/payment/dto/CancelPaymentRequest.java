package org.example.tishoo.domain.payment.dto;

public record CancelPaymentRequest(
        String paymentKey,
        String cancelReason
) {}