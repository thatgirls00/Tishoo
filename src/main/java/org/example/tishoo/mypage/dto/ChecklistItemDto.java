package org.example.tishoo.mypage.dto;

import java.time.LocalDate;

public class ChecklistItemDto {

    private Long id;
    private String content;
    private LocalDate dueDate;
    private boolean completed;

    public ChecklistItemDto() {
    }

    public ChecklistItemDto(Long id, String content, LocalDate dueDate, boolean completed) {
        this.id = id;
        this.content = content;
        this.dueDate = dueDate;
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
