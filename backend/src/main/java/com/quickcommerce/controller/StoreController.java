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
@RequestMapping("/api/store")
@CrossOrigin(origins = "*")
public class StoreController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private AuthService authService;

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getPendingOrders() {
        List<Order> orders = orderService.getOrdersByStatus(OrderStatus.PLACED);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/orders/{id}/pack")
    public ResponseEntity<Order> markAsPacked(@PathVariable Long id) {
        Order order = orderService.updateOrderStatus(id, OrderStatus.PACKED);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/orders/{id}/assign-driver")
    public ResponseEntity<Order> assignDriver(@PathVariable Long id, @RequestParam Long driverId) {
        Order order = orderService.assignDriver(id, driverId);
        return ResponseEntity.ok(order);
    }
}
