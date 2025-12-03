package org.example.tishoo.domain.mentor.controller;

import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.mentor.dto.MentorCreateRequest;
import org.example.tishoo.domain.mentor.dto.MentorResponse;
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

    @PostMapping
    public ResponseEntity<ApiResponse<MentorResponse>> createMentor(
            @RequestBody MentorCreateRequest request) {
        MentorResponse response = mentorService.createMentor(request);
        return ResponseEntity.ok(ApiResponse.success("멘토 회원가입이 완료되었습니다.", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MentorResponse>>> getAllMentors() {
        List<MentorResponse> mentors = mentorService.findAll();
        return ResponseEntity.ok(ApiResponse.success(mentors));
    }

    @GetMapping("/recommended")
    public ResponseEntity<ApiResponse<List<MentorResponse>>> getRecommendedMentors() {
        List<MentorResponse> mentors = mentorService.findRecommendedMentors();
        return ResponseEntity.ok(ApiResponse.success(mentors));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MentorResponse>> getMentorById(@PathVariable Long id) {
        MentorResponse mentor = mentorService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(mentor));
    }
}