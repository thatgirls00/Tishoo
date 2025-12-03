package org.example.tishoo.domain.project.service;

import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.project.dto.ProjectResponse;
import org.example.tishoo.domain.project.entity.Project;
import org.example.tishoo.domain.project.entity.ProjectMember;
import org.example.tishoo.domain.project.repository.ProjectMemberRepository;
import org.example.tishoo.domain.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectMemberService {

    private final ProjectMemberRepository repository;
    private final ProjectRepository projectRepository;

    public void addMember(Long projectId, Long menteeId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("프로젝트를 찾을 수 없습니다: projectId=" + projectId));

        // 멘토 추가 (이미 있으면 스킵)
        if (!repository.existsByProjectIdAndUserId(projectId, project.getMentor().getId())) {
            repository.save(ProjectMember.builder()
                    .projectId(projectId)
                    .userId(project.getMentor().getId())
                    .role("MENTOR")
                    .build());
            System.out.println("✅ 멘토 멤버 추가: projectId=" + projectId + ", mentorId=" + project.getMentor().getId());
        }

        // 멘티 추가 (중복 체크 후 저장)
        System.out.println("🔍 addMember 호출 - projectId: " + projectId + ", menteeId: " + menteeId);
        
        boolean alreadyExists = repository.existsByProjectIdAndUserId(projectId, menteeId);
        System.out.println("🔍 멤버 존재 여부 확인: " + alreadyExists);
        
        if (!alreadyExists) {
            ProjectMember menteeMember = repository.save(ProjectMember.builder()
                    .projectId(projectId)
                    .userId(menteeId)
                    .role("MENTEE")
                    .build());
            System.out.println("✅ 멘티 멤버 추가 성공: projectId=" + projectId + ", menteeId=" + menteeId + ", memberId=" + menteeMember.getId());
            
            // 저장 후 즉시 확인
            boolean saved = repository.existsByProjectIdAndUserId(projectId, menteeId);
            System.out.println("🔍 저장 후 확인: " + saved);
        } else {
            System.out.println("⚠️ 멘티 멤버 이미 존재: projectId=" + projectId + ", menteeId=" + menteeId);
        }
    }
    
    /**
     * 특정 멘티의 모든 프로젝트 멤버 삭제 (잘못된 데이터 정리용)
     */
    public void deleteAllByMentee(Long menteeId) {
        repository.deleteByUserIdAndRole(menteeId, "MENTEE");
        System.out.println("✅ 멘티의 모든 프로젝트 멤버 삭제: menteeId=" + menteeId);
    }
    
    /**
     * 특정 프로젝트의 특정 멘티 삭제
     */
    public void deleteMenteeFromProject(Long projectId, Long menteeId) {
        repository.deleteByProjectIdAndUserIdAndRole(projectId, menteeId, "MENTEE");
        System.out.println("✅ 프로젝트에서 멘티 삭제: projectId=" + projectId + ", menteeId=" + menteeId);
    }

    @Transactional(readOnly = true)
    public List<Project> getProjectsByMentee(Long menteeId) {
        // 멘티로 참여한 프로젝트만 조회 (role = "MENTEE" 필터링)
        System.out.println("🔍 getProjectsByMentee 호출 - menteeId: " + menteeId);
        List<Long> projectIds = repository.findProjectIdsByUserIdAndRole(menteeId, "MENTEE");
        System.out.println("🔍 조회된 프로젝트 ID 목록: " + projectIds);
        
        if (projectIds.isEmpty()) {
            System.out.println("⚠️ 멘티 ID " + menteeId + "에 대한 프로젝트가 없습니다.");
            return List.of();
        }
        
        List<Project> projects = projectRepository.findAllById(projectIds);
        System.out.println("✅ 멘티 ID " + menteeId + "의 프로젝트 조회 완료: " + projects.size() + "개");
        projects.forEach(p -> System.out.println("  - 프로젝트 ID: " + p.getId() + ", 제목: " + p.getTitle()));
        
        return projects;
    }
    
    /**
     * 프로젝트 멤버 존재 여부 확인
     */
    @Transactional(readOnly = true)
    public boolean existsByProjectIdAndUserId(Long projectId, Long userId) {
        return repository.existsByProjectIdAndUserId(projectId, userId);
    }
}