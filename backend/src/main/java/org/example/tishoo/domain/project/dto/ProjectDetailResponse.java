package org.example.tishoo.domain.project.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ProjectDetailResponse(
        Long id,
        Long mentorId,
        String mentorName,
        String mentorProfileImageUrl,
        String mentorIntro,
        String mentorSpecialty,
        String title,
        String description,
        String curriculum,
        List<String> skills,
        int price,
        int duration,
        String thumbnailUrl,
        boolean active,
        LocalDateTime createdAt,
        List<ReviewResponse> reviews
) {
    public record ReviewResponse(
            Long id,
            String menteeName,
            String content,
            int rating,
            LocalDateTime createdAt
    ) {}
}

