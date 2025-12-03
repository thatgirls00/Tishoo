package org.example.tishoo.domain.project.dto;

public record ProjectParticipationRequest(
        Long projectId,
        Long menteeId,
        String paymentKey,
        String orderId
) {}

