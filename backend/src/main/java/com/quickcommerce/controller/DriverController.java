package com.quickcommerce.controller;

import com.quickcommerce.entity.Order;
import com.quickcommerce.entity.OrderStatus;
import com.quickcommerce.entity.User;
import com.quickcommerce.service.AuthService;
import com.quickcommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/driver")
@CrossOrigin(origins = "*")
public class DriverController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private AuthService authService;

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAssignedOrders(Authentication authentication) {
        User driver = authService.getUserByEmail(authentication.getName());
        List<Order> orders = orderService.getDriverOrders(driver);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/orders/{id}/deliver")
    public ResponseEntity<Order> markAsDelivered(@PathVariable Long id) {
        Order order = orderService.updateOrderStatus(id, OrderStatus.DELIVERED);
        return ResponseEntity.ok(order);
    }
}
