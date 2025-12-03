package org.example.tishoo.domain.mentor.dto;

public record MentorCreateRequest(
        String name,
        String title,
        String profileImageUrl,
        String intro,
        String specialty,
        int price
) {}

