package org.example.tishoo.domain.order.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Table(name = "orders")
public class Order {

    @Id
    @Column(name = "order_id", columnDefinition = "BINARY(16)")
    private byte[] orderId;

}