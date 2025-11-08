package com.quickcommerce.controller;

import com.quickcommerce.dto.CartItemRequest;
import com.quickcommerce.entity.CartItem;
import com.quickcommerce.entity.User;
import com.quickcommerce.service.AuthService;
import com.quickcommerce.service.CartService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(Authentication authentication) {
        User user = authService.getUserByEmail(authentication.getName());
        List<CartItem> cartItems = cartService.getCartItems(user);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@Valid @RequestBody CartItemRequest cartItemRequest, Authentication authentication) {
        User user = authService.getUserByEmail(authentication.getName());
        CartItem cartItem = cartService.addToCart(user, cartItemRequest);
        return ResponseEntity.ok(cartItem);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long productId, Authentication authentication) {
        User user = authService.getUserByEmail(authentication.getName());
        cartService.removeFromCart(user, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        User user = authService.getUserByEmail(authentication.getName());
        cartService.clearCart(user);
        return ResponseEntity.ok().build();
    }
}
