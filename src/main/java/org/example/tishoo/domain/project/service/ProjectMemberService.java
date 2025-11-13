package org.example.tishoo.domain.project.service;

import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.project.entity.ProjectMember;
import org.example.tishoo.domain.project.repository.ProjectMemberRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectMemberService {

    private final ProjectMemberRepository repository;

    public void addMember(Long mentorId, Long menteeId) {
        // 멘토 추가
        repository.save(ProjectMember.builder()
                .projectId(mentorId)  // 임시: 멘토 ID 기준 프로젝트 생성
                .userId(mentorId)
                .role("MENTOR")
                .build());

        // 멘티 추가
        repository.save(ProjectMember.builder()
                .projectId(mentorId)
                .userId(menteeId)
                .role("MENTEE")
                .build());
    }
}