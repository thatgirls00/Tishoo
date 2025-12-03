package org.example.tishoo.domain.mentor.dto;

public record MentorResponse(
        Long id,
        String name,
        String title,
        String profileImageUrl,
        String intro,
        String specialty,
        int price,
        boolean active
) {}

