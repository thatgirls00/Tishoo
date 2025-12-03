package org.example.tishoo.mypage.dto;

import java.time.LocalDate;

public class AddChecklistItemRequest {

    private String content;
    private LocalDate dueDate;

    public AddChecklistItemRequest() {
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
}
