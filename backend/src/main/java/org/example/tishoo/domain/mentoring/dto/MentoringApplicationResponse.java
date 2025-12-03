package org.example.tishoo.domain.mentoring.dto;

import org.example.tishoo.domain.mentoring.entity.ApplicationStatus;

public record MentoringApplicationResponse(
        Long applicationId,
        String mentorName,
        int price,
        String sessionType,
        ApplicationStatus status
) {}