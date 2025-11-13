package org.example.tishoo.domain.mentor.service;

import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.mentor.entity.Mentor;
import org.example.tishoo.domain.mentor.repository.MentorRepository;
import org.example.tishoo.global.exception.BusinessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MentorService {

    private final MentorRepository mentorRepository;

    public List<Mentor> findAll() {
        return mentorRepository.findAll();
    }

    public Mentor findById(Long id) {
        return mentorRepository.findById(id)
                .orElseThrow(() -> new BusinessException("해당 멘토를 찾을 수 없습니다."));
    }
}