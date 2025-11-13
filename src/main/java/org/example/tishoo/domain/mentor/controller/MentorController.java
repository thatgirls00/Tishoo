package org.example.tishoo.domain.mentor.controller;

import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.mentor.entity.Mentor;
import org.example.tishoo.domain.mentor.service.MentorService;
import org.example.tishoo.global.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentors")
@RequiredArgsConstructor
public class MentorController {

    private final MentorService mentorService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Mentor>>> getAllMentors() {
        List<Mentor> mentors = mentorService.findAll();
        return ResponseEntity.ok(ApiResponse.success(mentors));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Mentor>> getMentorById(@PathVariable Long id) {
        Mentor mentor = mentorService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(mentor));
    }
}