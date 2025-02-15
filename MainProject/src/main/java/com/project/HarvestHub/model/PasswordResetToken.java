package com.project.HarvestHub.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Login user;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public LocalDateTime getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(LocalDateTime expiryDate) {
		this.expiryDate = expiryDate;
	}

	public Login getUser() {
		return user;
	}

	public void setUser(Login user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "PasswordResetToken [id=" + id + ", token=" + token + ", expiryDate=" + expiryDate + ", user=" + user
				+ "]";
	}

	public PasswordResetToken(Long id, String token, LocalDateTime expiryDate, Login user) {
		super();
		this.id = id;
		this.token = token;
		this.expiryDate = expiryDate;
		this.user = user;
	}

	public PasswordResetToken() {
		super();
	}
    
    

}