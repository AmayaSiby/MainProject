package com.project.HarvestHub.controller;

import com.project.HarvestHub.model.Order;
import com.project.HarvestHub.model.OrderStatus;
import com.project.HarvestHub.model.PaymentType;
import com.project.HarvestHub.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(403).body(null)); // Return 403 if order not found
    }

    @GetMapping("/consumer/{consumerEmail}")
    public ResponseEntity<List<Order>> getOrdersByConsumer(@PathVariable String consumerEmail) {
        return ResponseEntity.ok(orderService.getOrdersByConsumer(consumerEmail));
    }

    @GetMapping("/farmer/{farmerEmail}")
    public ResponseEntity<List<Order>> getOrdersByFarmer(@PathVariable String farmerEmail) {
        return ResponseEntity.ok(orderService.getOrdersByFarmer(farmerEmail));
    }

    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long id, @PathVariable OrderStatus status) {
        Optional<Order> updatedOrder = orderService.updateOrderStatus(id, status);
        return updatedOrder.isPresent()
                ? ResponseEntity.ok("Order status updated successfully")
                : ResponseEntity.badRequest().body("Order not found");
    }

    @PostMapping("/place")
    public ResponseEntity<String> placeOrder(@RequestBody Map<String, Object> requestBody) {
        try {
            String consumerEmail = (String) requestBody.get("consumerEmail");
            String farmerEmail = (String) requestBody.get("farmerEmail");
            PaymentType paymentType = PaymentType.valueOf((String) requestBody.get("paymentType"));
            String visitDateStr = (String) requestBody.get("visitDate");

            if (consumerEmail == null || consumerEmail.isEmpty()) {
                return ResponseEntity.badRequest().body("Consumer email is required");
            }

            if (visitDateStr == null || visitDateStr.isEmpty()) {
                return ResponseEntity.badRequest().body("Visit date is required");
            }

            LocalDate visitDate = LocalDate.parse(visitDateStr);
            orderService.placeOrders(consumerEmail, farmerEmail, paymentType, visitDate);

            return ResponseEntity.ok("Order placed successfully with payment type: " + paymentType);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid payment type or date format: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }


}
