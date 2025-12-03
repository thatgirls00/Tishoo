package org.example.tishoo.domain.project.service;

import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.mentor.entity.Mentor;
import org.example.tishoo.domain.mentor.repository.MentorRepository;
import org.example.tishoo.domain.project.dto.*;
import org.example.tishoo.domain.project.entity.Project;
import org.example.tishoo.domain.project.repository.ProjectRepository;
import org.example.tishoo.global.exception.BusinessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final MentorRepository mentorRepository;
    private final ProjectMemberService projectMemberService;

    public ProjectResponse createProject(ProjectRequest request) {
        Mentor mentor = mentorRepository.findById(request.mentorId())
                .orElseThrow(() -> new BusinessException("멘토를 찾을 수 없습니다."));

        Project project = Project.builder()
                .mentor(mentor)
                .title(request.title())
                .description(request.description())
                .curriculum(request.curriculum())
                .skills(request.skills() != null ? request.skills() : List.of())
                .price(request.price())
                .duration(request.duration())
                .thumbnailUrl(request.thumbnailUrl())
                .active(true)
                .build();

        Project saved = projectRepository.save(project);

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findActiveProjectsOrderByCreatedAt().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getProjectsByMentor(Long mentorId) {
        return projectRepository.findByMentor_Id(mentorId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectDetailResponse getProjectDetail(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new BusinessException("프로젝트를 찾을 수 없습니다."));

        Mentor mentor = project.getMentor();

        return new ProjectDetailResponse(
                project.getId(),
                mentor.getId(),
                mentor.getName(),
                mentor.getProfileImageUrl(),
                mentor.getIntro(),
                mentor.getSpecialty(),
                project.getTitle(),
                project.getDescription(),
                project.getCurriculum(),
                project.getSkills(),
                project.getPrice(),
                project.getDuration(),
                project.getThumbnailUrl(),
                project.isActive(),
                project.getCreatedAt(),
                List.of() // TODO: 리뷰 기능 추가 시 구현
        );
    }

    @Transactional
    public ProjectResponse participateInProject(ProjectParticipationRequest request) {
        Project project = projectRepository.findById(request.projectId())
                .orElseThrow(() -> new BusinessException("프로젝트를 찾을 수 없습니다."));

        // 결제 검증은 이미 완료된 것으로 가정 (TossPaymentController에서 처리)
        // 프로젝트 멤버로 추가
        projectMemberService.addMember(project.getMentor().getId(), request.menteeId());

        return toResponse(project);
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getMyProjects(Long userId, String role) {
        System.out.println("🔍 getMyProjects 호출 - userId: " + userId + ", role: " + role);
        
        if ("MENTOR".equals(role)) {
            return getProjectsByMentor(userId);
        } else {
            // 멘티의 경우 ProjectMember를 통해 참여한 프로젝트 조회
            List<Project> projects = projectMemberService.getProjectsByMentee(userId);
            System.out.println("✅ getMyProjects - 멘티 ID " + userId + "의 프로젝트: " + projects.size() + "개");
            
            List<ProjectResponse> responses = projects.stream()
                    .map(this::toResponse)
                    .toList();
            
            System.out.println("✅ getMyProjects 응답: " + responses.size() + "개");
            responses.forEach(r -> System.out.println("  - 프로젝트 ID: " + r.id() + ", 제목: " + r.title()));
            
            return responses;
        }
    }

    private ProjectResponse toResponse(Project project) {
        Mentor mentor = project.getMentor();
        return new ProjectResponse(
                project.getId(),
                mentor.getId(),
                mentor.getName(),
                mentor.getProfileImageUrl(),
                project.getTitle(),
                project.getDescription(),
                project.getCurriculum(),
                project.getSkills(),
                project.getPrice(),
                project.getDuration(),
                project.getThumbnailUrl(),
                project.isActive(),
                project.getCreatedAt()
        );
    }
}

