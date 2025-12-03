package org.example.tishoo.mypage.dto;

public class MyProjectSummaryDto {

    private Long projectId;
    private String projectName;
    private int progressRate;   // 0~100

    public MyProjectSummaryDto() {
    }

    public MyProjectSummaryDto(Long projectId, String projectName, int progressRate) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.progressRate = progressRate;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public int getProgressRate() {
        return progressRate;
    }

    public void setProgressRate(int progressRate) {
        this.progressRate = progressRate;
    }
}
