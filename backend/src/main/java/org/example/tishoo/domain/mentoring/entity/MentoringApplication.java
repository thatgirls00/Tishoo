package org.example.tishoo.domain.mentoring.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.tishoo.domain.mentor.entity.Mentor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "mentoring_applications")
public class MentoringApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_id")
    private Mentor mentor;

    private Long menteeId;
    private int price;
    private String sessionType;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}