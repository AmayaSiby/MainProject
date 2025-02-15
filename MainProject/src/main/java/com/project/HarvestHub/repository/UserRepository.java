package com.project.HarvestHub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.HarvestHub.model.Login;
import com.project.HarvestHub.model.Profile;
@Repository
public interface UserRepository extends JpaRepository<Login, Long>{
	   Optional<Login> findByEmail(String email);
	    Optional<Login> findById(Long id);


}
