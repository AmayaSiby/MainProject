package com.project.HarvestHub.service;

import com.project.HarvestHub.model.*;
import com.project.HarvestHub.repository.CartRepository;
import com.project.HarvestHub.repository.OrderRepository;
import com.project.HarvestHub.repository.TransactionRepository;
import com.project.HarvestHub.repository.VisitRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private VisitRequestRepository visitRequestRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private TransactionRepository transactionRepository;

    public List<Order> getOrdersByConsumer(String consumerEmail) {
        return orderRepository.findByConsumerEmail(consumerEmail);
    }

    public List<Order> getOrdersByFarmer(String farmerEmail) {
        List<Order> orders = orderRepository.findByFarmerEmail(farmerEmail);
        for (Order order : orders) {
            // Fetch transaction details if payment type is ONLINE
            if (order.getPaymentType() == PaymentType.ONLINE) {
                Transaction transaction = transactionRepository.findByConsumerEmailAndFarmerEmail(
                        order.getConsumerEmail(), order.getFarmerEmail()
                );
                if (transaction != null) {
                    order.setTransactionId(transaction.getTransactionId());
                }
            }
        }
        return orders;
    }


    public Optional<Order> updateOrderStatus(Long id, OrderStatus status) {
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus(status);
            orderRepository.save(order);
        }
        return orderOpt;
    }

    public void placeOrders(String consumerEmail, String farmerEmail, PaymentType paymentType, LocalDate visitDate) {
        List<Cart> cartItems = cartRepository.findByConsumerEmailAndFarmerEmail(consumerEmail, farmerEmail);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("No items found in the cart for this consumer and farmer.");
        }

        // Check and create a visit request if it doesn't exist
        VisitRequest existingRequest = visitRequestRepository.findByConsumerEmailAndFarmerEmail(consumerEmail, farmerEmail);
        if (existingRequest == null) {
            VisitRequest newRequest = new VisitRequest();
            newRequest.setConsumerEmail(consumerEmail);
            newRequest.setFarmerEmail(farmerEmail);
            newRequest.setVisitDate(visitDate);
            newRequest.setStatus(VisitStatus.PENDING);

            // Extract spice names and IDs from cart items
            List<Long> spiceIds = cartItems.stream().map(cart -> cart.getSpice().getId()).collect(Collectors.toList());
            List<String> spiceNames = cartItems.stream().map(cart -> cart.getSpice().getName()).collect(Collectors.toList());

            newRequest.setSpiceIds(spiceIds);
            newRequest.setSpiceNames(spiceNames);

            visitRequestRepository.save(newRequest);
        }

        List<Order> orders = cartItems.stream()
            .filter(this::isApproved)
            .map(cartItem -> new Order(
                cartItem.getConsumerEmail(),
                cartItem.getFarmerEmail(),
                cartItem.getSpice(),
                cartItem.getQuantity(),
                OrderStatus.ORDER_PLACED,
                paymentType
            ))
            .collect(Collectors.toList());

        orderRepository.saveAll(orders);
        cartRepository.deleteAll(cartItems);
    }

    private boolean isApproved(Cart cartItem) {
        VisitRequest visitRequest = visitRequestRepository.findByConsumerEmailAndFarmerEmail(
            cartItem.getConsumerEmail(), cartItem.getFarmerEmail()
        );
        return visitRequest != null && visitRequest.getStatus() == VisitStatus.APPROVED;
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    private void ensureVisitRequest(String consumerEmail, String farmerEmail) {
        VisitRequest existingRequest = visitRequestRepository.findByConsumerEmailAndFarmerEmail(consumerEmail, farmerEmail);
        if (existingRequest == null) {
            VisitRequest newRequest = new VisitRequest();
            newRequest.setConsumerEmail(consumerEmail);
            newRequest.setFarmerEmail(farmerEmail);
            newRequest.setStatus(VisitStatus.PENDING); // Default status
            visitRequestRepository.save(newRequest);
        }
    }
}