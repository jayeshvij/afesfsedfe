package com.quickcommerce.service;

import com.quickcommerce.dto.CartItemRequest;
import com.quickcommerce.entity.CartItem;
import com.quickcommerce.entity.Product;
import com.quickcommerce.entity.User;
import com.quickcommerce.repository.CartItemRepository;
import com.quickcommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<CartItem> getCartItems(User user) {
        return cartItemRepository.findByUser(user);
    }

    public CartItem addToCart(User user, CartItemRequest cartItemRequest) {
        Product product = productRepository.findById(cartItemRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existingCartItem = cartItemRepository.findByUserAndProduct(user, product);
        
        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + cartItemRequest.getQuantity());
            return cartItemRepository.save(cartItem);
        } else {
            CartItem cartItem = new CartItem(user, product, cartItemRequest.getQuantity());
            return cartItemRepository.save(cartItem);
        }
    }

    public void removeFromCart(User user, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        cartItemRepository.findByUserAndProduct(user, product)
                .ifPresent(cartItemRepository::delete);
    }

    public void clearCart(User user) {
        cartItemRepository.deleteByUser(user);
    }
}
