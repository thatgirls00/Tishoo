package org.example.tishoo.mypage.service;

import org.example.tishoo.mypage.dto.AddChecklistItemRequest;
import org.example.tishoo.mypage.dto.AddChecklistItemResponse;
import org.example.tishoo.mypage.dto.CalendarEventDto;
import org.example.tishoo.mypage.dto.ChecklistItemDto;
import org.example.tishoo.mypage.dto.MyPageSummaryResponse;
import org.example.tishoo.mypage.dto.MyProjectSummaryDto;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class MypageServiceImpl implements MypageService {

    private List<MyProjectSummaryDto> createDummyProjects(Long memberId) {
        List<MyProjectSummaryDto> list = new ArrayList<>();
        list.add(new MyProjectSummaryDto(1L, "사이드 프로젝트 플랫폼", 60));
        list.add(new MyProjectSummaryDto(2L, "실시간 채팅 미니 앱", 30));
        return list;
    }

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
    public MyPageSummaryResponse getMyPageSummary(Long memberId) {
        List<MyProjectSummaryDto> projects = createDummyProjects(memberId);
        List<CalendarEventDto> events = createDummyEvents(memberId, 1L);
        List<ChecklistItemDto> checklist = createDummyChecklist(memberId, 1L);

        return new MyPageSummaryResponse(projects, events, checklist);
    }

    @Override
    public List<ChecklistItemDto> getChecklist(Long memberId, Long projectId) {
        List<ChecklistItemDto> list = createDummyChecklist(memberId, projectId);
        list.sort(Comparator.comparing(ChecklistItemDto::getDueDate)
                .thenComparing(ChecklistItemDto::getId));
        return list;
    }

    @Override
    public AddChecklistItemResponse addChecklistItem(Long memberId, Long projectId,
                                                     AddChecklistItemRequest request) {

        ChecklistItemDto item = new ChecklistItemDto(
                999L,
                request.getContent(),
                request.getDueDate(),
                false
        );

        return new AddChecklistItemResponse(item);
    }
}
