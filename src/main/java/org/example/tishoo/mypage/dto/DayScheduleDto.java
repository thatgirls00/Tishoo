package org.example.tishoo.mypage.dto;

import java.time.LocalDate;
import java.util.List;

public class DayScheduleDto {

    private LocalDate date;
    private List<DayScheduleItemDto> items;

    public DayScheduleDto() {
    }

    public DayScheduleDto(LocalDate date, List<DayScheduleItemDto> items) {
        this.date = date;
        this.items = items;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<DayScheduleItemDto> getItems() {
        return items;
    }

    public void setItems(List<DayScheduleItemDto> items) {
        this.items = items;
    }
}
