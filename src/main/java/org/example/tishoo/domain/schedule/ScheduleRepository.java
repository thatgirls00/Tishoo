package org.example.tishoo.domain.schedule;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByProjectIdAndDate(Long projectId, LocalDate date);

    List<Schedule> findByProjectIdAndDateBetween(Long projectId, LocalDate start, LocalDate end);
}
