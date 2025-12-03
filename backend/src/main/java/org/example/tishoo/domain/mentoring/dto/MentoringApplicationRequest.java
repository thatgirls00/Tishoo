package org.example.tishoo.domain.mentoring.dto;

public record MentoringApplicationRequest(
        Long mentorId,
        Long menteeId,
        int price,
        String sessionType
) {}