package com.project.HarvestHub.controller;

import com.project.HarvestHub.model.Cart;
import com.project.HarvestHub.model.PaymentType;
import com.project.HarvestHub.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")  // Allow frontend requests
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add item to cart
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Cart cart) {
        try {
            // Validate that the cart object is valid
            if (cart.getConsumerEmail() == null || cart.getSpice() == null || cart.getSpice().getId() == null) {
                return ResponseEntity.badRequest().body("Invalid cart data. Spice and consumer email are required.");
            }

            // Extract the farmerEmail from the Cart object
            String farmerEmail = cart.getFarmerEmail();

            // Check if the item already exists in the cart
            boolean exists = cartService.cartItemExists(cart.getConsumerEmail(), cart.getSpice().getId());
            if (exists) {
                return ResponseEntity.badRequest().body("Item already exists in the cart.");
            }

            // Add the cart item with the farmerEmail
            Cart savedCart = cartService.addToCart(cart, farmerEmail);
            return ResponseEntity.ok(savedCart);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding item to cart: " + e.getMessage());
        }
    }

    // Get cart items for a consumer by email
    @GetMapping("/consumer/{email}")
    public ResponseEntity<?> getCartByConsumerEmail(@PathVariable String email) {
        try {
            List<Cart> cartItems = cartService.getCartByConsumerEmail(email);
            if (cartItems.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            // Set farmerEmail for each cart item
            cartItems.forEach(cart -> {
                if (cart.getSpice() != null) {
                    cart.setFarmerEmail(cart.getSpice().getFarmerEmail()); // Assign farmer email
                }
            });

            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching cart items: " + e.getMessage());
        }
    }

    // Remove item from cart by ID
 // Remove item from cart by ID
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long id) {
        try {
            // Call service method to remove item from cart
            boolean removed = cartService.removeItemFromCart(id);
            if (removed) {
                return ResponseEntity.ok("Item removed from cart successfully.");
            } else {
                return ResponseEntity.status(404).body("Item not found in cart.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error removing item from cart: " + e.getMessage());
        }
    }


    // Update cart item
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCart(@PathVariable Long id, @RequestBody Cart updatedCart) {
        try {
            Cart cart = cartService.updateCart(id, updatedCart);
            if (cart != null) {
                return ResponseEntity.ok(cart);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating cart: " + e.getMessage());
        }
    }

    // Get cart item by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCartById(@PathVariable Long id) {
        try {
            Cart cart = cartService.getCartById(id);
            if (cart != null) {
                return ResponseEntity.ok(cart);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching cart item: " + e.getMessage());
        }
    }

    // Clear all cart items for a consumer by email
    @DeleteMapping("/clear/{email}")
    public ResponseEntity<?> clearCart(@PathVariable String email) {
        try {
            cartService.clearCart(email);
            return ResponseEntity.ok("Cart cleared successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error clearing cart: " + e.getMessage());
        }
    }
    @PutMapping("/approveVisit/{visitRequestId}")
    public ResponseEntity<String> approveVisit(
            @PathVariable Long visitRequestId, 
            @RequestParam PaymentType paymentType) { // Accept paymentType as a request parameter
        try {
            // Call service method to approve visit and place orders with payment type
            cartService.approveVisitAndPlaceOrder(visitRequestId, paymentType);
            return ResponseEntity.ok("Visit request approved and orders placed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error approving visit and placing orders: " + e.getMessage());
        }
    }

    
}
