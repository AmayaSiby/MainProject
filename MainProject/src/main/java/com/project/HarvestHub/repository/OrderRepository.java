package com.project.HarvestHub.repository;

import com.project.HarvestHub.model.Order;
import com.project.HarvestHub.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByConsumerEmail(String consumerEmail);
    List<Order> findByFarmerEmail(String farmerEmail);
    List<Order> findByStatus(OrderStatus status);
}
