package com.project.HarvestHub.service;

import com.project.HarvestHub.model.Cart;
import com.project.HarvestHub.model.Order;
import com.project.HarvestHub.model.OrderStatus;
import com.project.HarvestHub.model.PaymentType;
import com.project.HarvestHub.model.Spice;
import com.project.HarvestHub.model.VisitRequest;
import com.project.HarvestHub.model.VisitStatus;
import com.project.HarvestHub.repository.CartRepository;
import com.project.HarvestHub.repository.SpiceRepository;
import com.project.HarvestHub.repository.VisitRequestRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.util.ArrayList; // for ArrayList implementation


@Service
public class VisitService {

    @Autowired
    private VisitRequestRepository visitRequestRepository;

    @Autowired
    private SpiceRepository spiceRepository;
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderService orderService;  // Inject OrderService to place orders


    public VisitRequest createVisitRequest(String consumerEmail, String farmerEmail, LocalDate visitDate) {
        // Fetch all cart items for this consumer and farmer
        List<Cart> cartItems = cartRepository.findByConsumerEmailAndFarmerEmail(consumerEmail, farmerEmail);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("No cart entry found for this consumer and farmer.");
        }

        // Extract spice IDs and names
        List<Long> spiceIds = cartItems.stream().map(cart -> cart.getSpice().getId()).collect(Collectors.toList());
        List<String> spiceNames = cartItems.stream().map(cart -> cart.getSpice().getName()).collect(Collectors.toList());

        // Create Visit Request with multiple spices
        VisitRequest visitRequest = new VisitRequest();
        visitRequest.setConsumerEmail(consumerEmail);
        visitRequest.setFarmerEmail(farmerEmail);
        visitRequest.setVisitDate(visitDate);
        visitRequest.setStatus(VisitStatus.PENDING);
        visitRequest.setSpiceIds(spiceIds);   // Setting list of spice IDs
        visitRequest.setSpiceNames(spiceNames); // Setting list of spice Names

        // Save and return the visit request
        return visitRequestRepository.save(visitRequest);
    }


    // Get all visit requests
    public List<VisitRequest> getAllVisitRequests() {
        return visitRequestRepository.findAll();
    }

    // Get visit requests for a specific consumer
    public List<VisitRequest> getVisitRequestsByConsumer(String consumerEmail) {
        return visitRequestRepository.findByConsumerEmail(consumerEmail);
    }

    // Get visit requests for a specific farmer
    public List<VisitRequest> getVisitRequestsByFarmer(String farmerEmail) {
        return visitRequestRepository.findByFarmerEmail(farmerEmail);
    }

    public VisitRequest updateVisitStatus(Long id, VisitStatus status) {
        Optional<VisitRequest> requestOptional = visitRequestRepository.findById(id);
        if (requestOptional.isPresent()) {
            VisitRequest request = requestOptional.get();
            request.setStatus(status);

            if (status == VisitStatus.APPROVED) {
                // Once approved, create orders and remove from cart
                placeOrdersFromVisitRequest(request);
            }

            return visitRequestRepository.save(request);
        }
        return null; // Handle not found scenario
    }

    private void placeOrdersFromVisitRequest(VisitRequest visitRequest) {
        String consumerEmail = visitRequest.getConsumerEmail();
        String farmerEmail = visitRequest.getFarmerEmail();
        LocalDate visitDate = visitRequest.getVisitDate(); // Get visit date

        // Place orders with PaymentType.DIRECT
        orderService.placeOrders(consumerEmail, farmerEmail, PaymentType.DIRECT, visitDate);
    }

    // This method should be called once the farmer approves the visit request
    @Transactional
    public void approveVisitRequest(Long visitRequestId) {
        // Fetch the visit request
        VisitRequest visitRequest = visitRequestRepository.findById(visitRequestId).orElseThrow(() -> new RuntimeException("Visit request not found"));

        // Check if the visit request is already approved, to prevent duplicates
        if (visitRequest.getStatus() == VisitStatus.APPROVED) {
            throw new RuntimeException("Visit request already approved");
        }

        // Update the status of the visit request to APPROVED
        visitRequest.setStatus(VisitStatus.APPROVED);
        visitRequestRepository.save(visitRequest);

        // Once the visit request is approved, place orders for the approved cart items
        placeOrdersFromVisitRequest(visitRequest);
    }
    // Delete a visit request
    public void deleteVisitRequest(Long id) {
        visitRequestRepository.deleteById(id);
    }
}
