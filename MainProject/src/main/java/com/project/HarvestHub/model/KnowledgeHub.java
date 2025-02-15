package com.project.HarvestHub.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "knowledge_hub")
public class KnowledgeHub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String farmerEmail;
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    private LocalDateTime createdAt;

    public KnowledgeHub() {
        this.createdAt = LocalDateTime.now();
    }

    public KnowledgeHub(String farmerEmail, String title, String content) {
        this.farmerEmail = farmerEmail;
        this.title = title;
        this.content = content;
        this.createdAt = LocalDateTime.now();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFarmerEmail() {
		return farmerEmail;
	}

	public void setFarmerEmail(String farmerEmail) {
		this.farmerEmail = farmerEmail;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "KnowledgeHub [id=" + id + ", farmerEmail=" + farmerEmail + ", title=" + title + ", content=" + content
				+ ", createdAt=" + createdAt + "]";
	}

	public KnowledgeHub(Long id, String farmerEmail, String title, String content, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.farmerEmail = farmerEmail;
		this.title = title;
		this.content = content;
		this.createdAt = createdAt;
	}

}
