package com.project.HarvestHub.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String consumerEmail;
    private String farmerEmail;

    @ManyToOne
    @JoinColumn(name = "spice_id", referencedColumnName = "id") // Linking to Spice table
    private Spice spice;

    private int quantity;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private OrderStatus status;  // Enum for order status

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;  // Enum for payment type

    private LocalDateTime orderDate;
    
 // Order.java (Add Transaction ID field if not present)
    @Transient
    private String transactionId;  // Not stored in Order table, fetched dynamically

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }


    public Order() {}

    public Order(String consumerEmail, String farmerEmail, Spice spice, int quantity, OrderStatus status, PaymentType paymentType) {
        this.consumerEmail = consumerEmail;
        this.farmerEmail = farmerEmail;
        this.spice = spice;
        this.quantity = quantity;
        this.status = status;
        this.paymentType = paymentType;
        this.orderDate = LocalDateTime.now();
    }

    public Order(String transactionId) {
		super();
		this.transactionId = transactionId;
	}

	@Override
	public String toString() {
		return "Order [transactionId=" + transactionId + "]";
	}

	// Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getConsumerEmail() { return consumerEmail; }
    public void setConsumerEmail(String consumerEmail) { this.consumerEmail = consumerEmail; }
    public String getFarmerEmail() { return farmerEmail; }
    public void setFarmerEmail(String farmerEmail) { this.farmerEmail = farmerEmail; }
    public Spice getSpice() { return spice; }
    public void setSpice(Spice spice) { this.spice = spice; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }
    public PaymentType getPaymentType() { return paymentType; }
    public void setPaymentType(PaymentType paymentType) { this.paymentType = paymentType; }
    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
}
