package com.project.HarvestHub.model;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "visit_requests")
public class VisitRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String consumerEmail; // Buyer who requested the visit
    private String farmerEmail;   // Farmer who will approve/reject the visit
    private LocalDate visitDate;  // Selected visit date

    @Enumerated(EnumType.STRING)
    private VisitStatus status; // Enum: PENDING, APPROVED, REJECTED

    // To store multiple spices
    @ElementCollection
    private List<Long> spiceIds;

    @ElementCollection
    private List<String> spiceNames;

    public VisitRequest() {
    }

    public VisitRequest(String consumerEmail, String farmerEmail, LocalDate visitDate, 
                        VisitStatus status, List<Long> spiceIds, List<String> spiceNames) {
        this.consumerEmail = consumerEmail;
        this.farmerEmail = farmerEmail;
        this.visitDate = visitDate;
        this.status = status;
        this.spiceIds = spiceIds;
        this.spiceNames = spiceNames;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getConsumerEmail() {
        return consumerEmail;
    }

    public String getFarmerEmail() {
        return farmerEmail;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public VisitStatus getStatus() {
        return status;
    }

    public List<Long> getSpiceIds() {
        return spiceIds;
    }

    public List<String> getSpiceNames() {
        return spiceNames;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setConsumerEmail(String consumerEmail) {
        this.consumerEmail = consumerEmail;
    }

    public void setFarmerEmail(String farmerEmail) {
        this.farmerEmail = farmerEmail;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public void setStatus(VisitStatus status) {
        this.status = status;
    }

    public void setSpiceIds(List<Long> spiceIds) {
        this.spiceIds = spiceIds;
    }

    public void setSpiceNames(List<String> spiceNames) {
        this.spiceNames = spiceNames;
    }
}
