package org.example.tishoo.domain.mentoring.service;

import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.mentor.entity.Mentor;
import org.example.tishoo.domain.mentoring.dto.MentoringApplicationRequest;
import org.example.tishoo.domain.mentoring.dto.MentoringApplicationResponse;
import org.example.tishoo.domain.mentoring.entity.ApplicationStatus;
import org.example.tishoo.domain.mentoring.entity.MentoringApplication;
import org.example.tishoo.domain.mentoring.repository.MentoringApplicationRepository;
import org.example.tishoo.domain.project.service.ProjectMemberService;
import org.example.tishoo.global.exception.BusinessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MentoringApplicationService {

    private final MentoringApplicationRepository repository;
    private final ProjectMemberService projectMemberService;

    public MentoringApplicationResponse createApplication(MentoringApplicationRequest request) {
        MentoringApplication app = MentoringApplication.builder()
                .mentor(Mentor.builder().id(request.mentorId()).build())
                .menteeId(request.menteeId())
                .price(request.price())
                .sessionType(request.sessionType())
                .status(ApplicationStatus.PENDING)
                .build();

        MentoringApplication saved = repository.save(app);

        return new MentoringApplicationResponse(
                saved.getId(),
                "멘토 이름",
                saved.getPrice(),
                saved.getSessionType(),
                saved.getStatus()
        );
    }

    @Transactional(readOnly = true)
    public MentoringApplicationResponse getApplication(Long id) {
        MentoringApplication app = repository.findById(id)
                .orElseThrow(() -> new BusinessException("신청 정보를 찾을 수 없습니다."));

        return new MentoringApplicationResponse(
                app.getId(),
                app.getMentor() != null ? app.getMentor().getName() : "Unknown",
                app.getPrice(),
                app.getSessionType(),
                app.getStatus()
        );
    }

    @Transactional(readOnly = true)
    public List<MentoringApplicationResponse> getApplicationsByMentor(Long mentorId) {
        return repository.findByMentor_Id(mentorId).stream()
                .map(app -> new MentoringApplicationResponse(
                        app.getId(),
                        app.getMentor().getName(),
                        app.getPrice(),
                        app.getSessionType(),
                        app.getStatus()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MentoringApplicationResponse> getApplicationsByMentee(Long menteeId) {
        return repository.findByMenteeId(menteeId).stream()
                .map(app -> new MentoringApplicationResponse(
                        app.getId(),
                        app.getMentor().getName(),
                        app.getPrice(),
                        app.getSessionType(),
                        app.getStatus()
                ))
                .toList();
    }

    @Transactional
    public MentoringApplicationResponse acceptApplication(Long applicationId) {
        MentoringApplication app = repository.findById(applicationId)
                .orElseThrow(() -> new BusinessException("신청 정보를 찾을 수 없습니다."));

        app.setStatus(ApplicationStatus.CONFIRMED); // 상태 변경

        // ✅ 프로젝트 구성원 추가
        projectMemberService.addMember(app.getMentor().getId(), app.getMenteeId());

        return new MentoringApplicationResponse(
                app.getId(),
                app.getMentor().getName(),
                app.getPrice(),
                app.getSessionType(),
                app.getStatus()
        );
    }
}