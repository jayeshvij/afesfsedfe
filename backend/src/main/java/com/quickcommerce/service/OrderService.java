package com.quickcommerce.service;

import com.quickcommerce.dto.OrderRequest;
import com.quickcommerce.entity.*;
import com.quickcommerce.repository.OrderRepository;
import com.quickcommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;

    public Order placeOrder(User user, OrderRequest orderRequest) {
        Order order = new Order(user, orderRequest.getAddress(), orderRequest.getTotalAmount());
        Order savedOrder = orderRepository.save(order);
        
        // Clear cart after placing order
        cartService.clearCart(user);
        
        return savedOrder;
    }

    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUser(user);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    public List<Order> getDriverOrders(User driver) {
        return orderRepository.findByDriver(driver);
    }

    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public Order assignDriver(Long orderId, Long driverId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        User driver = userRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));
        
        order.setDriver(driver);
        order.setStatus(OrderStatus.OUT_FOR_DELIVERY);
        
        return orderRepository.save(order);
    }
}
