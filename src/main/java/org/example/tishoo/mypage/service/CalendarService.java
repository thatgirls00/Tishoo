package org.example.tishoo.mypage.service;

import org.example.tishoo.mypage.dto.DayScheduleDto;
import org.example.tishoo.mypage.dto.MonthCalendarDto;
import org.example.tishoo.mypage.dto.ScheduleListDto;

import java.time.LocalDate;

public interface CalendarService {

    // CalendarController에서 이렇게 부르고 있을 가능성이 크니까, 시그니처를 맞춰준다.
    MonthCalendarDto getMonthCalendar(Long projectId, int year, int month);

    DayScheduleDto getDaySchedule(Long projectId, LocalDate date);

    ScheduleListDto getScheduleList(Long projectId, LocalDate startDate, LocalDate endDate);
}
