package org.example.tishoo.mypage.dto;

import java.util.List;

public class MonthCalendarDto {

    private int year;
    private int month;
    private List<MonthDaySummaryDto> days;

    public MonthCalendarDto() {
    }

    public MonthCalendarDto(int year, int month, List<MonthDaySummaryDto> days) {
        this.year = year;
        this.month = month;
        this.days = days;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public List<MonthDaySummaryDto> getDays() {
        return days;
    }

    public void setDays(List<MonthDaySummaryDto> days) {
        this.days = days;
    }
}
