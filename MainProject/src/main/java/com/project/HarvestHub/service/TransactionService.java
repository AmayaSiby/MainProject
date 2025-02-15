package com.project.HarvestHub.service;

import com.project.HarvestHub.model.*;
import com.project.HarvestHub.repository.TransactionRepository;
import com.project.HarvestHub.repository.CartRepository;
import com.project.HarvestHub.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartRepository cartRepository;

    @Transactional
    public void processTransaction(String consumerEmail, String farmerEmail, String transactionId, PaymentType paymentType) {
        // Validate online payment
        if (paymentType == PaymentType.ONLINE && (transactionId == null || transactionId.trim().isEmpty())) {
            throw new IllegalArgumentException("Transaction ID is required for online payment.");
        }

        // Create and save the transaction
        Transaction transaction = new Transaction();
        transaction.setConsumerEmail(consumerEmail);
        transaction.setFarmerEmail(farmerEmail);
        transaction.setTransactionId(transactionId);
        transaction.setPaymentType(paymentType);
        transaction.setTransactionDate(new Date());

        transactionRepository.save(transaction);
        System.out.println("Transaction stored successfully!");

        // If online payment, place orders and clear the cart
        if (paymentType == PaymentType.ONLINE) {
            LocalDate today = LocalDate.now();
            orderService.placeOrders(consumerEmail, farmerEmail, paymentType, today);
            System.out.println("Orders placed successfully!");

            // Clear the cart after placing orders
            cartRepository.deleteByConsumerEmail(consumerEmail);
            System.out.println("Cart cleared successfully!");
        }
    }

    // Fetch all transactions
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // Fetch transactions by consumer email
    public List<Transaction> getTransactionsByConsumer(String consumerEmail) {
        return transactionRepository.findByConsumerEmail(consumerEmail);
    }
}
