package org.example.tishoo.domain.mentor.repository;

import org.example.tishoo.domain.mentor.entity.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MentorRepository extends JpaRepository<Mentor, Long> {
}