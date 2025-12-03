package org.example.tishoo.mypage.dto;

import java.util.List;

public class ProjectProgressDto {

    private Long projectId;
    private int progressPercent;     // 전체 진행도
    private int completedTasks;      // 완료 과제 수
    private int totalTasks;          // 전체 과제 수
    private int feedbackAcceptRate;  // 피드백 수용률(퍼센트)
    private List<String> recentActivities; // 최근 활동 텍스트 목록

    public ProjectProgressDto() {
    }

    public ProjectProgressDto(Long projectId,
                              int progressPercent,
                              int completedTasks,
                              int totalTasks,
                              int feedbackAcceptRate,
                              List<String> recentActivities) {
        this.projectId = projectId;
        this.progressPercent = progressPercent;
        this.completedTasks = completedTasks;
        this.totalTasks = totalTasks;
        this.feedbackAcceptRate = feedbackAcceptRate;
        this.recentActivities = recentActivities;
    }

    public Long getProjectId() {
        return projectId;
    }

    public int getProgressPercent() {
        return progressPercent;
    }

    public int getCompletedTasks() {
        return completedTasks;
    }

    public int getTotalTasks() {
        return totalTasks;
    }

    public int getFeedbackAcceptRate() {
        return feedbackAcceptRate;
    }

    public List<String> getRecentActivities() {
        return recentActivities;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public void setProgressPercent(int progressPercent) {
        this.progressPercent = progressPercent;
    }

    public void setCompletedTasks(int completedTasks) {
        this.completedTasks = completedTasks;
    }

    public void setTotalTasks(int totalTasks) {
        this.totalTasks = totalTasks;
    }

    public void setFeedbackAcceptRate(int feedbackAcceptRate) {
        this.feedbackAcceptRate = feedbackAcceptRate;
    }

    public void setRecentActivities(List<String> recentActivities) {
        this.recentActivities = recentActivities;
    }
}
