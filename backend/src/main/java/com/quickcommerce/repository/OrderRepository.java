package com.quickcommerce.repository;

import com.quickcommerce.entity.Order;
import com.quickcommerce.entity.User;
import com.quickcommerce.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByStatus(OrderStatus status);
    List<Order> findByDriver(User driver);
}
