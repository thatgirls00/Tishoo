package org.example.tishoo.domain.mentoring.repository;

import org.example.tishoo.domain.mentoring.entity.MentoringApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentoringApplicationRepository extends JpaRepository<MentoringApplication, Long> {
    List<MentoringApplication> findByMentor_Id(Long mentorId);
    List<MentoringApplication> findByMenteeId(Long menteeId);
}