package org.example.tishoo.domain.payment.dto;

public record SaveAmountRequest(
        String orderId,
        String amount
) {}