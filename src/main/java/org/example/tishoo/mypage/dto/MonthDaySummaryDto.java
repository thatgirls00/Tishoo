package org.example.tishoo.mypage.dto;

public class MonthDaySummaryDto {

    private int day;         // 1~31
    private int totalCount;  // 그 날의 일정/체크리스트 개수

    public MonthDaySummaryDto() {
    }

    public MonthDaySummaryDto(int day, int totalCount) {
        this.day = day;
        this.totalCount = totalCount;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }
}
