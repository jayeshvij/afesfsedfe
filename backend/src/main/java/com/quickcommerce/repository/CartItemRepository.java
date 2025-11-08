package com.quickcommerce.repository;

import com.quickcommerce.entity.CartItem;
import com.quickcommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    Optional<CartItem> findByUserAndProduct(User user, com.quickcommerce.entity.Product product);
    void deleteByUser(User user);
}
