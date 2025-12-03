package org.example.tishoo.mypage.dto;

import java.util.List;

public class MyPageSummaryResponse {

    private List<MyProjectSummaryDto> projects;
    private List<CalendarEventDto> calendarEvents;
    private List<ChecklistItemDto> checklistItems;

    public MyPageSummaryResponse() {
    }

    public MyPageSummaryResponse(List<MyProjectSummaryDto> projects,
                                 List<CalendarEventDto> calendarEvents,
                                 List<ChecklistItemDto> checklistItems) {
        this.projects = projects;
        this.calendarEvents = calendarEvents;
        this.checklistItems = checklistItems;
    }

    public List<MyProjectSummaryDto> getProjects() {
        return projects;
    }

    public void setProjects(List<MyProjectSummaryDto> projects) {
        this.projects = projects;
    }

    public List<CalendarEventDto> getCalendarEvents() {
        return calendarEvents;
    }

    public void setCalendarEvents(List<CalendarEventDto> calendarEvents) {
        this.calendarEvents = calendarEvents;
    }

    public List<ChecklistItemDto> getChecklistItems() {
        return checklistItems;
    }

    public void setChecklistItems(List<ChecklistItemDto> checklistItems) {
        this.checklistItems = checklistItems;
    }
}
