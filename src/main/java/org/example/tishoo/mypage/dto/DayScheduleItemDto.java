package org.example.tishoo.mypage.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class DayScheduleItemDto {

    private Long id;
    private String title;
    private String type;        // "일정" / "체크리스트"
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean completed;

    public DayScheduleItemDto() {
    }

    public DayScheduleItemDto(Long id, String title, String type,
                              LocalDate date, LocalTime startTime,
                              LocalTime endTime, boolean completed) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
