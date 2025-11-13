package org.example.tishoo.domain.project.repository;

import org.example.tishoo.domain.project.entity.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {
}