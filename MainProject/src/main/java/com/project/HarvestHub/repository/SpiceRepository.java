package com.project.HarvestHub.repository;

import com.project.HarvestHub.model.Spice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SpiceRepository extends JpaRepository<Spice, Long> {
    List<Spice> findByFarmerEmail(String farmerEmail);
    Optional<Spice> findByName(String spiceName); 
}