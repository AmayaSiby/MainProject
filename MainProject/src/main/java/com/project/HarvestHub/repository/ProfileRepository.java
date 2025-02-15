package com.project.HarvestHub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.HarvestHub.model.Login;
import com.project.HarvestHub.model.Profile;

@Repository 
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUser(Login user);
    Profile findByUserId(Long userId);  // Optional for safety

}
