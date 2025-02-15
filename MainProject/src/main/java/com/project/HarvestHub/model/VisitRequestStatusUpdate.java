package com.project.HarvestHub.model;

public class VisitRequestStatusUpdate {
    private String farmerEmail;
    private String status;

    public String getFarmerEmail() {
        return farmerEmail;
    }

    public void setFarmerEmail(String farmerEmail) {
        this.farmerEmail = farmerEmail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
