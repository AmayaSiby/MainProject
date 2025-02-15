package com.project.HarvestHub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phoneNumber;
    private String address;
    private String state;
    private String modeOfDelivery;
    @Lob
    private String farmerImage;

    private String accountNumber;
    private String ifscCode;
    private String branchName;
    private String bankName;
    @Lob
    private String qrCodeImage; // Store image as LONGTEXT

    @OneToOne
    @JoinColumn(name = "user_id")  // Linking to Login table using user_id
    private Login user;

    // Constructors
    public Profile() {
        super();
    }

    public Profile(Long id, String phoneNumber, String address, String state, String modeOfDelivery, String farmerImage,
                   String accountNumber, String ifscCode, String branchName, String bankName, String qrCodeImage, Login user) {
        super();
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.state = state;
        this.modeOfDelivery = modeOfDelivery;
        this.farmerImage = farmerImage;
        this.accountNumber = accountNumber;
        this.ifscCode = ifscCode;
        this.branchName = branchName;
        this.bankName = bankName;
        this.qrCodeImage = qrCodeImage;
        this.user = user;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getModeOfDelivery() {
        return modeOfDelivery;
    }

    public void setModeOfDelivery(String modeOfDelivery) {
        this.modeOfDelivery = modeOfDelivery;
    }

    public String getFarmerImage() {
        return farmerImage;
    }

    public void setFarmerImage(String farmerImage) {
        this.farmerImage = farmerImage;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getQrCodeImage() {
        return qrCodeImage;
    }

    public void setQrCodeImage(String qrCodeImage) {
        this.qrCodeImage = qrCodeImage;
    }

    public Login getUser() {
        return user;
    }

    public void setUser(Login user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Profile [id=" + id + ", phoneNumber=" + phoneNumber + ", address=" + address + ", state=" + state
                + ", modeOfDelivery=" + modeOfDelivery + ", farmerImage=" + farmerImage + ", accountNumber=" + accountNumber
                + ", ifscCode=" + ifscCode + ", branchName=" + branchName + ", bankName=" + bankName
                + ", qrCodeImage=" + qrCodeImage + ", user=" + user + "]";
    }
}
