package org.example.tishoo.domain.project.repository;

import org.example.tishoo.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByMentor_Id(Long mentorId);
    
    List<Project> findByActiveTrue();
    
    @Query("SELECT p FROM Project p WHERE p.active = true ORDER BY p.createdAt DESC")
    List<Project> findActiveProjectsOrderByCreatedAt();
}

