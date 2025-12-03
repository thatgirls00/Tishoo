package org.example.tishoo.domain.order.repository;

import org.example.tishoo.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, byte[]> {
}