package com.project.HarvestHub.controller;

import com.project.HarvestHub.model.Transaction;
import com.project.HarvestHub.model.PaymentType;
import com.project.HarvestHub.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Process a new transaction (Using @RequestBody for better REST API design)
    @PostMapping("/process")
    public ResponseEntity<String> processTransaction(@RequestBody Transaction transaction) {
        try {
            // Validate online payments must have a transaction ID
            if (transaction.getPaymentType() == PaymentType.ONLINE && 
                (transaction.getTransactionId() == null || transaction.getTransactionId().isEmpty())) {
                return ResponseEntity.badRequest().body("Transaction ID is required for online payments.");
            }

            transactionService.processTransaction(
                transaction.getConsumerEmail(),
                transaction.getFarmerEmail(),
                transaction.getTransactionId(),
                transaction.getPaymentType()
            );

            return ResponseEntity.ok("Transaction processed successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing transaction: " + e.getMessage());
        }
    }

    // Get all transactions
    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    // Get transactions by consumer email
    @GetMapping("/consumer/{email}")
    public ResponseEntity<List<Transaction>> getTransactionsByConsumer(@PathVariable String email) {
        List<Transaction> transactions = transactionService.getTransactionsByConsumer(email);
        return ResponseEntity.ok(transactions);
    }
}
