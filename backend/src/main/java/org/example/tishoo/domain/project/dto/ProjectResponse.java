package org.example.tishoo.domain.project.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ProjectResponse(
        Long id,
        Long mentorId,
        String mentorName,
        String mentorProfileImageUrl,
        String title,
        String description,
        String curriculum,
        List<String> skills,
        int price,
        int duration,
        String thumbnailUrl,
        boolean active,
        LocalDateTime createdAt
) {}

