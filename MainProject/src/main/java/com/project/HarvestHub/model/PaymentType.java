package com.project.HarvestHub.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum PaymentType {
    ONLINE, 
    DIRECT;

    @JsonCreator
    public static PaymentType fromString(String value) {
        if (value == null) {
            throw new IllegalArgumentException("PaymentType cannot be null");
        }

        String normalized = value.toUpperCase().trim();

        if (normalized.equals("BANK_TRANSFER") || normalized.equals("UPI") || normalized.equals("NET_BANKING")) {
            return ONLINE;  // Map all these to ONLINE
        } else if (normalized.equals("CASH") || normalized.equals("DIRECT")) {
            return DIRECT;  // Map all these to DIRECT
        }

        throw new IllegalArgumentException("Invalid PaymentType: " + value);
    }

    @JsonValue
    public String toJson() {
        return this.name();
    }
}
