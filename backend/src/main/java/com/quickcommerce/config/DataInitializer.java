package com.quickcommerce.config;

import com.quickcommerce.entity.*;
import com.quickcommerce.repository.ProductRepository;
import com.quickcommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create hardcoded users
        createUsers();
        
        // Create hardcoded products
        createProducts();
    }

    private void createUsers() {
        // User
        if (!userRepository.existsByEmail("user@qcom")) {
            User user = new User("user@qcom", passwordEncoder.encode("user123"), Role.USER);
            user.setName("Test User");
            userRepository.save(user);
        }

        // Admin
        if (!userRepository.existsByEmail("admin@qcom")) {
            User admin = new User("admin@qcom", passwordEncoder.encode("admin123"), Role.ADMIN);
            admin.setName("Admin User");
            userRepository.save(admin);
        }

        // Store Owner
        if (!userRepository.existsByEmail("store@qcom")) {
            User storeOwner = new User("store@qcom", passwordEncoder.encode("store123"), Role.STORE_OWNER);
            storeOwner.setName("Store Owner");
            userRepository.save(storeOwner);
        }

        // Driver
        if (!userRepository.existsByEmail("driver@qcom")) {
            User driver = new User("driver@qcom", passwordEncoder.encode("driver123"), Role.DRIVER);
            driver.setName("Delivery Driver");
            userRepository.save(driver);
        }
    }

    private void createProducts() {
        if (productRepository.count() == 0) {
            // iPhone
            Product iphone = new Product(
                "iPhone 15 Pro",
                "Latest iPhone with A17 Pro chip and titanium design",
                new BigDecimal("99999"),
                "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
                10
            );
            productRepository.save(iphone);

            // iPad
            Product ipad = new Product(
                "iPad Air",
                "Powerful tablet with M2 chip and Liquid Retina display",
                new BigDecimal("59999"),
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
                15
            );
            productRepository.save(ipad);

            // AirPods
            Product airpods = new Product(
                "AirPods Pro",
                "Wireless earbuds with active noise cancellation",
                new BigDecimal("24999"),
                "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400",
                25
            );
            productRepository.save(airpods);

            // Samsung Galaxy Tab
            Product samsungTab = new Product(
                "Samsung Galaxy Tab S9",
                "Premium Android tablet with S Pen included",
                new BigDecimal("79999"),
                "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400",
                8
            );
            productRepository.save(samsungTab);

            // MacBook Air
            Product macbook = new Product(
                "MacBook Air M2",
                "Ultra-thin laptop with M2 chip and all-day battery",
                new BigDecimal("99999"),
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
                5
            );
            productRepository.save(macbook);

            // Samsung Galaxy S24
            Product samsungPhone = new Product(
                "Samsung Galaxy S24",
                "Flagship Android smartphone with AI features",
                new BigDecimal("79999"),
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
                12
            );
            productRepository.save(samsungPhone);

            // Apple Watch
            Product appleWatch = new Product(
                "Apple Watch Series 9",
                "Smartwatch with health monitoring and fitness tracking",
                new BigDecimal("39999"),
                "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",
                20
            );
            productRepository.save(appleWatch);

            // Sony WH-1000XM5
            Product sonyHeadphones = new Product(
                "Sony WH-1000XM5",
                "Premium noise-cancelling wireless headphones",
                new BigDecimal("29999"),
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
                18
            );
            productRepository.save(sonyHeadphones);

            // Dell XPS 13
            Product dellLaptop = new Product(
                "Dell XPS 13",
                "Ultrabook with InfinityEdge display and Intel processor",
                new BigDecimal("89999"),
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
                7
            );
            productRepository.save(dellLaptop);

            // Nintendo Switch
            Product nintendoSwitch = new Product(
                "Nintendo Switch OLED",
                "Gaming console with OLED screen and Joy-Con controllers",
                new BigDecimal("34999"),
                "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
                14
            );
            productRepository.save(nintendoSwitch);
        }
    }
}
