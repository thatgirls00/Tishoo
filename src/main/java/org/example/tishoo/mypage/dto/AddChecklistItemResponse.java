package org.example.tishoo.mypage.dto;

public class AddChecklistItemResponse {

    private ChecklistItemDto item;

    public AddChecklistItemResponse() {
    }

    public AddChecklistItemResponse(ChecklistItemDto item) {
        this.item = item;
    }

    public ChecklistItemDto getItem() {
        return item;
    }

    public void setItem(ChecklistItemDto item) {
        this.item = item;
    }
}
