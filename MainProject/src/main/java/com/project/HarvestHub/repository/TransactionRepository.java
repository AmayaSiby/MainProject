package com.project.HarvestHub.repository;

import com.project.HarvestHub.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByConsumerEmail(String consumerEmail);

	Transaction findByConsumerEmailAndFarmerEmail(String consumerEmail, String farmerEmail);
}
