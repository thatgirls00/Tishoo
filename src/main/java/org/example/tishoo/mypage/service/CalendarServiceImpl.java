package org.example.tishoo.mypage.service;

import org.example.tishoo.mypage.dto.CalendarEventDto;
import org.example.tishoo.mypage.dto.ChecklistItemDto;
import org.example.tishoo.mypage.dto.DayScheduleDto;
import org.example.tishoo.mypage.dto.DayScheduleItemDto;
import org.example.tishoo.mypage.dto.MonthCalendarDto;
import org.example.tishoo.mypage.dto.MonthDaySummaryDto;
import org.example.tishoo.mypage.dto.ScheduleListDto;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CalendarServiceImpl implements CalendarService {

    private List<CalendarEventDto> createDummyEvents(Long memberId, Long projectId) {
        List<CalendarEventDto> list = new ArrayList<>();
        list.add(new CalendarEventDto(
                1L,
                "멘토링 세션 3주차",
                LocalDate.of(2025, 11, 13),
                LocalTime.of(20, 0),
                LocalTime.of(22, 0),
                "멘토링"
        ));
        list.add(new CalendarEventDto(
                2L,
                "프로젝트 중간 회의",
                LocalDate.of(2025, 11, 15),
                LocalTime.of(19, 0),
                LocalTime.of(20, 0),
                "회의"
        ));
        list.add(new CalendarEventDto(
                3L,
                "프로젝트 회고",
                LocalDate.of(2025, 11, 20),
                LocalTime.of(21, 0),
                LocalTime.of(22, 0),
                "회의"
        ));
        return list;
    }

    private List<ChecklistItemDto> createDummyChecklist(Long memberId, Long projectId) {
        List<ChecklistItemDto> list = new ArrayList<>();
        list.add(new ChecklistItemDto(
                1L,
                "로그인 API 연동",
                LocalDate.of(2025, 11, 13),
                true
        ));
        list.add(new ChecklistItemDto(
                2L,
                "캘린더 월간보기 화면 구현",
                LocalDate.of(2025, 11, 13),
                false
        ));
        list.add(new ChecklistItemDto(
                3L,
                "체크리스트 리스트뷰 정렬",
                LocalDate.of(2025, 11, 15),
                false
        ));
        list.add(new ChecklistItemDto(
                4L,
                "사이드 프로젝트 설명 작성",
                LocalDate.of(2025, 11, 18),
                false
        ));
        return list;
    }

    @Override
    public MonthCalendarDto getMonthCalendar(Long memberId, Long projectId, int year, int month) {
        List<CalendarEventDto> events = createDummyEvents(memberId, projectId);
        List<ChecklistItemDto> checklist = createDummyChecklist(memberId, projectId);

        Map<Integer, Integer> dayCountMap = new HashMap<>();

        for (CalendarEventDto e : events) {
            if (e.getDate().getYear() == year && e.getDate().getMonthValue() == month) {
                int day = e.getDate().getDayOfMonth();
                dayCountMap.put(day, dayCountMap.getOrDefault(day, 0) + 1);
            }
        }

        for (ChecklistItemDto c : checklist) {
            if (c.getDueDate().getYear() == year && c.getDueDate().getMonthValue() == month) {
                int day = c.getDueDate().getDayOfMonth();
                dayCountMap.put(day, dayCountMap.getOrDefault(day, 0) + 1);
            }
        }

        List<MonthDaySummaryDto> days = dayCountMap.entrySet().stream()
                .map(e -> new MonthDaySummaryDto(e.getKey(), e.getValue()))
                .sorted(Comparator.comparingInt(MonthDaySummaryDto::getDay))
                .collect(Collectors.toList());

        return new MonthCalendarDto(year, month, days);
    }

    @Override
    public DayScheduleDto getDaySchedule(Long memberId, Long projectId, String date) {
        LocalDate target = LocalDate.parse(date);

        List<CalendarEventDto> events = createDummyEvents(memberId, projectId);
        List<ChecklistItemDto> checklist = createDummyChecklist(memberId, projectId);

        List<DayScheduleItemDto> items = new ArrayList<>();

        for (CalendarEventDto e : events) {
            if (e.getDate().equals(target)) {
                items.add(new DayScheduleItemDto(
                        e.getId(),
                        e.getTitle(),
                        "일정",
                        e.getDate(),
                        e.getStartTime(),
                        e.getEndTime(),
                        false
                ));
            }
        }

        for (ChecklistItemDto c : checklist) {
            if (c.getDueDate().equals(target)) {
                items.add(new DayScheduleItemDto(
                        c.getId(),
                        c.getContent(),
                        "체크리스트",
                        c.getDueDate(),
                        null,
                        null,
                        c.isCompleted()
                ));
            }
        }

        items.sort(Comparator
                .comparing(DayScheduleItemDto::getType)
                .thenComparing(DayScheduleItemDto::getTitle));

        return new DayScheduleDto(target, items);
    }

    @Override
    public ScheduleListDto getScheduleList(Long memberId, Long projectId) {
        List<CalendarEventDto> events = createDummyEvents(memberId, projectId);
        List<ChecklistItemDto> checklist = createDummyChecklist(memberId, projectId);

        List<DayScheduleItemDto> items = new ArrayList<>();

        for (CalendarEventDto e : events) {
            items.add(new DayScheduleItemDto(
                    e.getId(),
                    e.getTitle(),
                    "일정",
                    e.getDate(),
                    e.getStartTime(),
                    e.getEndTime(),
                    false
            ));
        }

        for (ChecklistItemDto c : checklist) {
            items.add(new DayScheduleItemDto(
                    c.getId(),
                    c.getContent(),
                    "체크리스트",
                    c.getDueDate(),
                    null,
                    null,
                    c.isCompleted()
            ));
        }

        items.sort(Comparator
                .comparing(DayScheduleItemDto::getDate)
                .thenComparing(DayScheduleItemDto::getType)
                .thenComparing(DayScheduleItemDto::getTitle));

        return new ScheduleListDto(items);
    }
}
