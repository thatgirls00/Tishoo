package org.example.tishoo.domain.payment.dto;

import lombok.Builder;

@Builder
public record PaymentErrorResponse(
        int code,
        String message
) {}