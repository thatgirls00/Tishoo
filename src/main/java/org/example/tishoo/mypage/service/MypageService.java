package org.example.tishoo.mypage.service;

import org.example.tishoo.mypage.dto.AddChecklistItemRequest;
import org.example.tishoo.mypage.dto.AddChecklistItemResponse;
import org.example.tishoo.mypage.dto.ChecklistItemDto;
import org.example.tishoo.mypage.dto.MyPageSummaryResponse;

import java.util.List;

public interface MypageService {

    MyPageSummaryResponse getMyPageSummary(Long memberId);

    List<ChecklistItemDto> getChecklist(Long memberId, Long projectId);

    AddChecklistItemResponse addChecklistItem(Long memberId, Long projectId,
                                              AddChecklistItemRequest request);
}
