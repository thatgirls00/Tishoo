package org.example.tishoo.mypage.controller;

import org.example.tishoo.mypage.dto.AddChecklistItemRequest;
import org.example.tishoo.mypage.dto.ChecklistItemDto;
import org.example.tishoo.mypage.dto.MyPageSummaryResponse;
import org.example.tishoo.mypage.service.MypageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mypage")
public class MypageController {

    private final MypageService mypageService;

    public MypageController(MypageService mypageService) {
        this.mypageService = mypageService;
    }

    /**
     * 마이페이지 상단 요약 + 내 프로젝트 리스트
     * 예시: GET /api/mypage?memberId=1
     */
    @GetMapping
    public MyPageSummaryResponse getMyPageSummary(@RequestParam("memberId") Long memberId) {
        return mypageService.getMyPageSummary(memberId);
    }

    /**
     * 특정 프로젝트의 체크리스트 조회
     * 예시: GET /api/mypage/projects/1/checklist?memberId=1
     */
    @GetMapping("/projects/{projectId}/checklist")
    public List<ChecklistItemDto> getChecklist(@RequestParam("memberId") Long memberId,
                                               @PathVariable("projectId") Long projectId) {
        return mypageService.getChecklist(memberId, projectId);
    }

    /**
     * 특정 프로젝트에 체크리스트 항목 추가
     * 예시: POST /api/mypage/projects/1/checklist?memberId=1
     * Body(JSON):
     * {
     *   "content": "새로운 체크리스트",
     *   "dueDate": "2025-11-30"
     * }
     */
    @PostMapping("/projects/{projectId}/checklist")
    public ChecklistItemDto addChecklistItem(@RequestParam("memberId") Long memberId,
                                             @PathVariable("projectId") Long projectId,
                                             @RequestBody AddChecklistItemRequest request) {
        return mypageService.addChecklistItem(memberId, projectId, request);
    }

    /**
     * 체크리스트 완료 여부 토글
     * 예시: PATCH /api/mypage/checklist/10/toggle?memberId=1
     */
    @PatchMapping("/checklist/{itemId}/toggle")
    public ChecklistItemDto toggleChecklistItem(@RequestParam("memberId") Long memberId,
                                                @PathVariable("itemId") Long itemId) {
        return mypageService.toggleChecklistItem(memberId, itemId);
    }
}

