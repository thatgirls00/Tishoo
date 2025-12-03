package org.example.tishoo.mypage.dto;

import java.time.LocalDate;

public class ProjectSummaryDto {

    private Long projectId;
    private String projectName;
    private String mentorName;
    private int progressPercent;
    private LocalDate startDate;
    private LocalDate endDate;

    public ProjectSummaryDto() {
    }

    public ProjectSummaryDto(Long projectId,
                             String projectName,
                             String mentorName,
                             int progressPercent,
                             LocalDate startDate,
                             LocalDate endDate) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.mentorName = mentorName;
        this.progressPercent = progressPercent;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getProjectId() {
        return projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getMentorName() {
        return mentorName;
    }

    public int getProgressPercent() {
        return progressPercent;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }

    public void setProgressPercent(int progressPercent) {
        this.progressPercent = progressPercent;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
