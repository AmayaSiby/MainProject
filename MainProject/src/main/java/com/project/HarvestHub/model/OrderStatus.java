package com.project.HarvestHub.model;

public enum OrderStatus {
    PENDING,
    ORDER_PLACED,
    ORDER_CONFIRMED,
    ORDER_PROCESSED,  // Add this
    SHIPPED,          // Add this
    OUT_FOR_DELIVERY, // Add this
    DELIVERED,
    CANCELLED
}
