package org.example.tishoo.domain.payment.repository;

import org.example.tishoo.domain.order.entity.Order;
import org.example.tishoo.domain.payment.entity.TossPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TossPaymentRepository extends JpaRepository<TossPayment, byte[]> {

    Optional<TossPayment> findByOrder(Order order);

    Optional<TossPayment> findByTossPaymentKey(String tossPaymentKey);
}