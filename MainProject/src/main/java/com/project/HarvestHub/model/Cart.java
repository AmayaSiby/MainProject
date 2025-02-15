package com.project.HarvestHub.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String consumerEmail; // Consumer email instead of name
    
    @ManyToOne
    @JoinColumn(name = "spice_id", referencedColumnName = "id")  // Foreign key linking to Spice table
    private Spice spice;

    private int quantity;
    
    private String farmerEmail;
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getConsumerEmail() {
		return consumerEmail;
	}
	public void setConsumerEmail(String consumerEmail) {
		this.consumerEmail = consumerEmail;
	}
	public Spice getSpice() {
		return spice;
	}
	public void setSpice(Spice spice) {
		this.spice = spice;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getFarmerEmail() {
		return farmerEmail;
	}
	public void setFarmerEmail(String farmerEmail) {
		this.farmerEmail = farmerEmail;
	}
	@Override
	public String toString() {
		return "Cart [id=" + id + ", consumerEmail=" + consumerEmail + ", spice=" + spice + ", quantity=" + quantity
				+ ", farmerEmail=" + farmerEmail + "]";
	}
	public Cart(Long id, String consumerEmail, Spice spice, int quantity, String farmerEmail) {
		super();
		this.id = id;
		this.consumerEmail = consumerEmail;
		this.spice = spice;
		this.quantity = quantity;
		this.farmerEmail = farmerEmail;
	}
	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}
