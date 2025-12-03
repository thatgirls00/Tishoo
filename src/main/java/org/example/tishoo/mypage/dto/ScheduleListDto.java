package org.example.tishoo.mypage.dto;

import java.util.List;

public class ScheduleListDto {

    private List<DayScheduleItemDto> items;

    public ScheduleListDto() {
    }

    public ScheduleListDto(List<DayScheduleItemDto> items) {
        this.items = items;
    }

    public List<DayScheduleItemDto> getItems() {
        return items;
    }

    public void setItems(List<DayScheduleItemDto> items) {
        this.items = items;
    }
}
