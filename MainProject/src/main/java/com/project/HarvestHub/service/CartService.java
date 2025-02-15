package com.project.HarvestHub.service;

import com.project.HarvestHub.model.*;
import com.project.HarvestHub.repository.CartRepository;
import com.project.HarvestHub.repository.OrderRepository;
import com.project.HarvestHub.repository.VisitRequestRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private VisitRequestRepository visitRequestRepository;

    @Autowired
    private OrderRepository orderRepository;  // Injecting OrderRepository to save orders

    public Cart addToCart(Cart cart, String farmerEmail) {
        // Set the farmerEmail before saving the cart
        cart.setFarmerEmail(farmerEmail);
        return cartRepository.save(cart);
    }

    public List<Cart> getCartByConsumerEmail(String email) {
        return cartRepository.findByConsumerEmail(email);  // Fetch cart by consumer email
    }

    public Cart updateCart(Long id, Cart updatedCart) {
        return cartRepository.findById(id).map(cart -> {
            cart.setQuantity(updatedCart.getQuantity());
            return cartRepository.save(cart);  // Update and save cart
        }).orElse(null);
    }

    public Cart getCartById(Long id) {
        return cartRepository.findById(id).orElse(null);  // Fetch cart by ID
    }

    public void clearCart(String email) {
        cartRepository.deleteByConsumerEmail(email);  // Clear cart by consumer email
    }

    public boolean cartItemExists(String consumerEmail, Long spiceId) {
        return cartRepository.existsByConsumerEmailAndSpiceId(consumerEmail, spiceId);
    }
    
    public boolean removeItemFromCart(Long id) {
        try {
            Optional<Cart> cartItemOptional = cartRepository.findById(id);
            if (cartItemOptional.isPresent()) {
                cartRepository.delete(cartItemOptional.get());
                return true;
            } else {
                return false; // Item not found
            }
        } catch (Exception e) {
            // Handle any exceptions
            throw new RuntimeException("Error removing item from cart", e);
        }
    }

    // Method to approve the visit and move cart items to orders
    @Transactional
    public void approveVisitAndPlaceOrder(Long visitRequestId, PaymentType paymentType) {
        // Fetch the visit request based on ID
        VisitRequest visitRequest = visitRequestRepository.findById(visitRequestId)
                .orElseThrow(() -> new RuntimeException("Visit request not found"));

        // Check if visit is approved
        if (visitRequest.getStatus() == VisitStatus.APPROVED) {
            // Fetch all cart items for the consumer and farmer
            List<Cart> cartItems = cartRepository.findByConsumerEmailAndFarmerEmail(
                    visitRequest.getConsumerEmail(), visitRequest.getFarmerEmail());

            // Convert the cart items to order objects
            List<Order> orders = cartItems.stream().map(cartItem -> {
                return new Order(
                        cartItem.getConsumerEmail(),
                        cartItem.getFarmerEmail(),
                        cartItem.getSpice(),
                        cartItem.getQuantity(),
                        OrderStatus.PENDING,
                        paymentType // Include PaymentType while creating the Order
                );
            }).collect(Collectors.toList());

            // Save the orders in the order repository
            orderRepository.saveAll(orders);

            // Remove cart items after the order is created
            cartItems.forEach(cart -> cartRepository.deleteById(cart.getId()));
        }
    }
}
