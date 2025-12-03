package org.example.tishoo.mypage.dto;

import java.time.LocalDateTime;

public class ChatMessageDto {

    private Long messageId;
    private Long projectId;
    private String senderName;
    private String message;
    private LocalDateTime sentAt;
    private boolean fromMentor;

    public ChatMessageDto() {
    }

    public ChatMessageDto(Long messageId,
                          Long projectId,
                          String senderName,
                          String message,
                          LocalDateTime sentAt,
                          boolean fromMentor) {
        this.messageId = messageId;
        this.projectId = projectId;
        this.senderName = senderName;
        this.message = message;
        this.sentAt = sentAt;
        this.fromMentor = fromMentor;
    }

    public Long getMessageId() {
        return messageId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public String getSenderName() {
        return senderName;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public boolean isFromMentor() {
        return fromMentor;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public void setFromMentor(boolean fromMentor) {
        this.fromMentor = fromMentor;
    }
}
