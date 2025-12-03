package org.example.tishoo.domain.project.repository;

import org.example.tishoo.domain.project.entity.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {
    
    boolean existsByProjectIdAndUserId(Long projectId, Long userId);
    
    @Query("SELECT pm.projectId FROM ProjectMember pm WHERE pm.userId = :userId AND pm.role = :role")
    List<Long> findProjectIdsByUserIdAndRole(@Param("userId") Long userId, @Param("role") String role);
    
    @Query("SELECT pm.projectId FROM ProjectMember pm WHERE pm.userId = :userId")
    List<Long> findProjectIdsByUserId(@Param("userId") Long userId);
    
    // 특정 멘티의 모든 프로젝트 멤버 삭제
    void deleteByUserIdAndRole(Long userId, String role);
    
    // 특정 프로젝트의 특정 멘티 삭제
    void deleteByProjectIdAndUserIdAndRole(Long projectId, Long userId, String role);
    
    // 특정 멘티의 특정 프로젝트 삭제
    void deleteByProjectIdAndUserId(Long projectId, Long userId);
}