package org.example.tishoo.domain.mentoring.controller;

import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.mentoring.dto.MentoringApplicationRequest;
import org.example.tishoo.domain.mentoring.dto.MentoringApplicationResponse;
import org.example.tishoo.domain.mentoring.service.MentoringApplicationService;
import org.example.tishoo.global.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentoring/applications")
@RequiredArgsConstructor
public class MentoringApplicationController {

    private final MentoringApplicationService service;

    @PostMapping
    public ResponseEntity<ApiResponse<MentoringApplicationResponse>> create(
            @RequestBody MentoringApplicationRequest request) {
        var response = service.createApplication(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MentoringApplicationResponse>> get(
            @PathVariable Long id) {
        var response = service.getApplication(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<ApiResponse<List<MentoringApplicationResponse>>> getByMentor(@PathVariable Long mentorId) {
        var list = service.getApplicationsByMentor(mentorId);
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/mentee/{menteeId}")
    public ResponseEntity<ApiResponse<List<MentoringApplicationResponse>>> getByMentee(@PathVariable Long menteeId) {
        var list = service.getApplicationsByMentee(menteeId);
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<ApiResponse<MentoringApplicationResponse>> accept(@PathVariable Long id) {
        var response = service.acceptApplication(id);
        return ResponseEntity.ok(ApiResponse.success("신청이 승인되었습니다.", response));
    }
}