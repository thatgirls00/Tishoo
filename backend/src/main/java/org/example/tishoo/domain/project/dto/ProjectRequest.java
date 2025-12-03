package org.example.tishoo.domain.project.dto;

import java.util.List;

public record ProjectRequest(
        Long mentorId,
        String title,
        String description,
        String curriculum,
        List<String> skills,
        int price,
        int duration,
        String thumbnailUrl
) {}

