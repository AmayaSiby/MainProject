package com.project.HarvestHub.model;

public class ResponseCheck {
    private boolean exists;

    public ResponseCheck(boolean exists) {
        this.exists = exists;
    }

    public boolean isExists() {
        return exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }
}
