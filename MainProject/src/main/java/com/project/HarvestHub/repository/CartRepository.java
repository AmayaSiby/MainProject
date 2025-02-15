package com.project.HarvestHub.repository;

import com.project.HarvestHub.model.Cart;
import com.project.HarvestHub.model.Spice;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    
    List<Cart> findByConsumerEmail(String consumerEmail);
    @Transactional
    void deleteByConsumerEmail(String consumerEmail);

    boolean existsByConsumerEmailAndSpiceId(String consumerEmail, Long spiceId);
    Optional<Cart> findByConsumerEmailAndSpice(String consumerEmail, Spice spice);
    List<Cart> findByConsumerEmailAndFarmerEmail(String consumerEmail, String farmerEmail);
    void deleteById(Long id);  // Delete specific cart item
    // New method to delete cart items by spice IDs
    void deleteBySpiceIdIn(List<Long> spiceIds);
}
