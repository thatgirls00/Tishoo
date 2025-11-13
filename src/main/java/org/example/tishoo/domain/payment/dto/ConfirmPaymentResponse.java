package org.example.tishoo.domain.payment.dto;

import org.example.tishoo.domain.payment.entity.TossPaymentMethod;
import org.example.tishoo.domain.payment.entity.TossPaymentStatus;

import java.time.LocalDateTime;

public record ConfirmPaymentResponse(
        String tossPaymentKey,
        String tossOrderId,
        long totalAmount,
        TossPaymentMethod method,
        TossPaymentStatus status,
        LocalDateTime requestedAt,
        LocalDateTime approvedAt
) {}