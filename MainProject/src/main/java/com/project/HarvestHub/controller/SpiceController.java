package com.project.HarvestHub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.HarvestHub.model.Spice;
import com.project.HarvestHub.service.SpiceService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/spices")
@CrossOrigin(origins="http://localhost:3000")
public class SpiceController {

    @Autowired
    private SpiceService spiceService;

    // Add a new spice
    @PostMapping("/add")
    public Spice addSpice(@RequestBody Spice spice) {
        return spiceService.addSpice(spice);
    }
    
    @GetMapping("/{id}")
    public Optional<Spice> getSpicesid(@PathVariable Long id) {
        return spiceService.getSpicesById(id);
    }

    @GetMapping("/getspice")
    public List<Spice> getAllSpices() {
        return spiceService.getAllSpices();  // Fetch all spices from the service layer
    }


    // Get spices by farmer's email
    @GetMapping("/by-email")
    public List<Spice> getSpices(@RequestParam String farmerEmail) {
        return spiceService.getSpicesByFarmerEmail(farmerEmail);
    }

    // Edit an existing spice
    @PutMapping("/edit")
    public Spice editSpice(@RequestBody Spice spice) {
        return spiceService.editSpice(spice);
    }

    // Delete a spice by its ID
    @DeleteMapping("/delete/{id}")
    public void deleteSpice(@PathVariable Long id) {
        spiceService.deleteSpice(id);
    }
}
