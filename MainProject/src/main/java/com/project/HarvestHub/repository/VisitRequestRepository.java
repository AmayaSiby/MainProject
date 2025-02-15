package com.project.HarvestHub.repository;

import com.project.HarvestHub.model.VisitRequest;
import com.project.HarvestHub.model.VisitStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VisitRequestRepository extends JpaRepository<VisitRequest, Long> {
    
    List<VisitRequest> findByConsumerEmail(String consumerEmail);

    List<VisitRequest> findByFarmerEmail(String farmerEmail);
    
    List<VisitRequest> findByStatus(VisitStatus status);

	VisitRequest findByConsumerEmailAndFarmerEmail(String consumerEmail, String farmerEmail);
}
