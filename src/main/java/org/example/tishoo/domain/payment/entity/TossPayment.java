package org.example.tishoo.domain.payment.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.tishoo.domain.order.entity.Order;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "TossPayment")
public class TossPayment {

    @Id
    @Column(name = "payment_id", columnDefinition = "VARBINARY(255)")
    private byte[] paymentId;

    @Column(nullable = false, unique = true)
    private String tossPaymentKey;

    // 토스 내부에서 관리하는 별도의 orderId
    @Column(nullable = false)
    private String tossOrderId;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(nullable = false)
    private long totalAmount;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private TossPaymentMethod tossPaymentMethod;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private TossPaymentStatus tossPaymentStatus;

    @Column(nullable = false)
    private LocalDateTime requestedAt;

    private LocalDateTime approvedAt;
}