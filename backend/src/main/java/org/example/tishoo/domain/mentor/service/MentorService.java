package org.example.tishoo.domain.mentor.service;

import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.mentor.dto.MentorCreateRequest;
import org.example.tishoo.domain.mentor.dto.MentorResponse;
import org.example.tishoo.domain.mentor.entity.Mentor;
import org.example.tishoo.domain.mentor.repository.MentorRepository;
import org.example.tishoo.global.exception.BusinessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MentorService {

    private final MentorRepository mentorRepository;

    @Transactional
    public MentorResponse createMentor(MentorCreateRequest request) {
        Mentor mentor = Mentor.builder()
                .name(request.name())
                .title(request.title())
                .profileImageUrl(request.profileImageUrl())
                .intro(request.intro())
                .specialty(request.specialty())
                .price(request.price())
                .active(true)
                .build();

        Mentor saved = mentorRepository.save(mentor);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<MentorResponse> findAll() {
        return mentorRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MentorResponse> findRecommendedMentors() {
        // 추천 멘토: active가 true이고 최근에 생성된 멘토들을 우선 표시
        // TODO: 추후 평점, 리뷰 수 등을 고려한 추천 알고리즘 추가 가능
        return mentorRepository.findAll().stream()
                .filter(Mentor::isActive)
                .limit(10) // 최대 10명
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MentorResponse findById(Long id) {
        Mentor mentor = mentorRepository.findById(id)
                .orElseThrow(() -> new BusinessException("해당 멘토를 찾을 수 없습니다."));
        return toResponse(mentor);
    }

    private MentorResponse toResponse(Mentor mentor) {
        return new MentorResponse(
                mentor.getId(),
                mentor.getName(),
                mentor.getTitle(),
                mentor.getProfileImageUrl(),
                mentor.getIntro(),
                mentor.getSpecialty(),
                mentor.getPrice(),
                mentor.isActive()
        );
    }
}