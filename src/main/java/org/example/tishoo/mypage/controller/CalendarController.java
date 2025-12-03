package org.example.tishoo.mypage.controller;

import lombok.RequiredArgsConstructor;
import org.example.tishoo.mypage.dto.DayScheduleDto;
import org.example.tishoo.mypage.dto.MonthCalendarDto;
import org.example.tishoo.mypage.dto.ScheduleListDto;
import org.example.tishoo.mypage.service.CalendarService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projects/{projectId}/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    // 1) 월간 보기 (달력)
    @GetMapping("/month")
    public MonthCalendarDto getMonthCalendar(
            @PathVariable Long projectId,
            @RequestParam int year,
            @RequestParam int month
    ) {
        return calendarService.getMonthCalendar(projectId, year, month);
    }

    // 2) 특정 날짜 일정
    @GetMapping("/day")
    public DayScheduleDto getDaySchedule(
            @PathVariable Long projectId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return calendarService.getDaySchedule(projectId, date);
    }

    // 3) 리스트 보기 (기간 전체)
    @GetMapping("/list")
    public ScheduleListDto getScheduleList(
            @PathVariable Long projectId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return calendarService.getScheduleList(projectId, startDate, endDate);
    }
}
