package com.project.HarvestHub.service;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.HarvestHub.model.Spice;
import com.project.HarvestHub.repository.SpiceRepository;

@Service
public class SpiceService {

    @Autowired
    private SpiceRepository spiceRepository;

    // Add new spice
    public Spice addSpice(Spice spice) {
        return spiceRepository.save(spice);
    }

    public List<Spice> getAllSpices() {
        return spiceRepository.findAll();  // Fetches all spices from the database
    }

    // Get spices by farmer email
    public List<Spice> getSpicesByFarmerEmail(String farmerEmail) {
        return spiceRepository.findByFarmerEmail(farmerEmail);  // Fetch spices by farmer email
    }

    public Optional<Spice> getSpicesById(Long id) {
        return spiceRepository.findById(id);  // Fetch spice by ID
    }

    // Edit spice (no save operation if unchanged)
    public Spice editSpice(Spice spice) {
        // We assume the passed spice has a valid ID, and it's already saved.
        // No need to save again unless it's a new one.
        return spiceRepository.save(spice); // Saves changes to the existing spice
    }

    // Delete spice
    public void deleteSpice(Long id) {
        spiceRepository.deleteById(id);  // Delete spice by ID
    }
}
