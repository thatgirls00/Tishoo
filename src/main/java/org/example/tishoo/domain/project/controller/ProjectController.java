package org.example.tishoo.domain.project.controller;

import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.project.dto.*;
import org.example.tishoo.domain.project.service.ProjectMemberService;
import org.example.tishoo.domain.project.service.ProjectService;
import org.example.tishoo.global.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectMemberService projectMemberService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectResponse>> createProject(
            @RequestBody ProjectRequest request) {
        ProjectResponse response = projectService.createProject(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> getAllProjects() {
        List<ProjectResponse> projects = projectService.getAllProjects();
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDetailResponse>> getProjectDetail(
            @PathVariable Long id) {
        ProjectDetailResponse response = projectService.getProjectDetail(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> getProjectsByMentor(
            @PathVariable Long mentorId) {
        List<ProjectResponse> projects = projectService.getProjectsByMentor(mentorId);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @PostMapping("/participate")
    public ResponseEntity<ApiResponse<ProjectResponse>> participateInProject(
            @RequestBody ProjectParticipationRequest request) {
        ProjectResponse response = projectService.participateInProject(request);
        return ResponseEntity.ok(ApiResponse.success("프로젝트 신청이 완료되었습니다.", response));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> getMyProjects(
            @RequestParam Long userId,
            @RequestParam String role) {
        List<ProjectResponse> projects = projectService.getMyProjects(userId, role);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }
    
    /**
     * 잘못된 프로젝트 멤버 데이터 삭제 (멘티의 모든 프로젝트 멤버 삭제)
     */
    @DeleteMapping("/members/mentee/{menteeId}")
    public ResponseEntity<ApiResponse<String>> deleteAllMenteeProjects(
            @PathVariable Long menteeId) {
        projectMemberService.deleteAllByMentee(menteeId);
        return ResponseEntity.ok(ApiResponse.success("멘티의 모든 프로젝트 멤버가 삭제되었습니다."));
    }
    
    /**
     * 특정 프로젝트에서 멘티 삭제
     */
    @DeleteMapping("/{projectId}/members/mentee/{menteeId}")
    public ResponseEntity<ApiResponse<String>> deleteMenteeFromProject(
            @PathVariable Long projectId,
            @PathVariable Long menteeId) {
        projectMemberService.deleteMenteeFromProject(projectId, menteeId);
        return ResponseEntity.ok(ApiResponse.success("프로젝트에서 멘티가 삭제되었습니다."));
    }
}

