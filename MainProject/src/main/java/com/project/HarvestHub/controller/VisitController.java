package com.project.HarvestHub.controller;

import com.project.HarvestHub.model.Spice;
import com.project.HarvestHub.model.VisitRequest;
import com.project.HarvestHub.model.VisitStatus;
import com.project.HarvestHub.service.VisitService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/visitrequests")
@CrossOrigin(origins = "http://localhost:3000")
public class VisitController {

    @Autowired
    private VisitService visitRequestService;

    // Create a visit request
    @PostMapping("/create")
    public VisitRequest createVisitRequest(@RequestBody Map<String, Object> request) {
        String consumerEmail = (String) request.get("consumerEmail");
        String farmerEmail = (String) request.get("farmerEmail");
        LocalDate visitDate = LocalDate.parse((String) request.get("visitDate"));
        
        return visitRequestService.createVisitRequest(consumerEmail, farmerEmail, visitDate);
    }



  
    
    // Get all visit requests
    @GetMapping
    public List<VisitRequest> getAllVisitRequests() {
        return visitRequestService.getAllVisitRequests();
    }

    // Get visit requests by consumer email
    @GetMapping("/consumer/{email}")
    public List<VisitRequest> getVisitRequestsByConsumer(@PathVariable String email) {
        return visitRequestService.getVisitRequestsByConsumer(email);
    }

    // Get visit requests by farmer email
    @GetMapping("/farmer/{email}")
    public List<VisitRequest> getVisitRequestsByFarmer(@PathVariable String email) {
        return visitRequestService.getVisitRequestsByFarmer(email);
    }

    // Approve or Reject a visit request
    @PutMapping("/{id}/status")
    public VisitRequest updateVisitStatus(@PathVariable Long id, @RequestParam VisitStatus status) {
        return visitRequestService.updateVisitStatus(id, status);
    }

    // Delete a visit request
    @DeleteMapping("/{id}")
    public void deleteVisitRequest(@PathVariable Long id) {
        visitRequestService.deleteVisitRequest(id);
    }
}
