package com.project.HarvestHub.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import java.util.ArrayList; // for ArrayList implementation


@Entity
public class Spice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String spicePhoto;
    private int quantity;
    private int minPriceLevel;
    private String availability;
    private int amountOfAvailability;
    private String farmerAddress;
    private String farmerPhoneNumber;
    private String description;
    private String farmerEmail;
   
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSpicePhoto() {
		return spicePhoto;
	}
	public void setSpicePhoto(String spicePhoto) {
		this.spicePhoto = spicePhoto;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getMinPriceLevel() {
		return minPriceLevel;
	}
	public void setMinPriceLevel(int minPriceLevel) {
		this.minPriceLevel = minPriceLevel;
	}
	public String getAvailability() {
		return availability;
	}
	public void setAvailability(String availability) {
		this.availability = availability;
	}
	public int getAmountOfAvailability() {
		return amountOfAvailability;
	}
	public void setAmountOfAvailability(int amountOfAvailability) {
		this.amountOfAvailability = amountOfAvailability;
	}
	public String getFarmerAddress() {
		return farmerAddress;
	}
	public void setFarmerAddress(String farmerAddress) {
		this.farmerAddress = farmerAddress;
	}
	public String getFarmerPhoneNumber() {
		return farmerPhoneNumber;
	}
	public void setFarmerPhoneNumber(String farmerPhoneNumber) {
		this.farmerPhoneNumber = farmerPhoneNumber;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getFarmerEmail() {
		return farmerEmail;
	}
	public void setFarmerEmail(String farmerEmail) {
		this.farmerEmail = farmerEmail;
	}
	
	@Override
	public String toString() {
		return "Spice [id=" + id + ", name=" + name + ", spicePhoto=" + spicePhoto + ", quantity=" + quantity
				+ ", minPriceLevel=" + minPriceLevel + ", availability=" + availability + ", amountOfAvailability="
				+ amountOfAvailability + ", farmerAddress=" + farmerAddress + ", farmerPhoneNumber=" + farmerPhoneNumber
				+ ", description=" + description + ", farmerEmail=" + farmerEmail 
				+ "]";
	}
	public Spice(Long id, String name, String spicePhoto, int quantity, int minPriceLevel, String availability,
			int amountOfAvailability, String farmerAddress, String farmerPhoneNumber, String description,
			String farmerEmail) {
		super();
		this.id = id;
		this.name = name;
		this.spicePhoto = spicePhoto;
		this.quantity = quantity;
		this.minPriceLevel = minPriceLevel;
		this.availability = availability;
		this.amountOfAvailability = amountOfAvailability;
		this.farmerAddress = farmerAddress;
		this.farmerPhoneNumber = farmerPhoneNumber;
		this.description = description;
		this.farmerEmail = farmerEmail;
	}
	public Spice() {
		super();
		// TODO Auto-generated constructor stub
	}

	 
}