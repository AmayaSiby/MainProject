package com.project.HarvestHub.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "users")
public class Login {
    @Id 
    @GeneratedValue (strategy = GenerationType .IDENTITY)
    private Long id;

    private String name;
    private String email;
    @Column (nullable = false)
    private String role;
    @Column(nullable = false)
    private String password;
    private boolean blocked = false; // New field to track blocked status
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean isBlocked() {
		return blocked;
	}
	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}
	@Override
	public String toString() {
		return "Login [id=" + id + ", name=" + name + ", email=" + email + ", role=" + role + ", password=" + password
				+ ", blocked=" + blocked + "]";
	}
	public Login(Long id, String name, String email, String role, String password, boolean blocked) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.role = role;
		this.password = password;
		this.blocked = blocked;
	}
	public Login() {
		super();
		// TODO Auto-generated constructor stub
	}


}