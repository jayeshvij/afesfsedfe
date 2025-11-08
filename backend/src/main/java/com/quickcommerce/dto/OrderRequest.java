package com.quickcommerce.dto;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class OrderRequest {
    @NotBlank
    private String address;

    private BigDecimal totalAmount;

    public OrderRequest() {}

    public OrderRequest(String address, BigDecimal totalAmount) {
        this.address = address;
        this.totalAmount = totalAmount;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
}
