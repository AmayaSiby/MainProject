package com.project.HarvestHub.controller;

import com.project.HarvestHub.model.Profile;
import com.project.HarvestHub.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "http://localhost:3000")

public class ProfileController {

    @Autowired
    private ProfileService profileService;
 // Get profile by email
    @GetMapping("/user/email/{email}")
    public ResponseEntity<?> getProfileByEmail(@PathVariable String email) {
        try {
            Profile profile = profileService.getProfileByEmail(email);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profile not found for email: " + email);
        }
    }

    // Get profile by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        try {
            Profile profile = profileService.getProfileByUserId(userId);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            // Log error and return meaningful message
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profile not found for user with ID: " + userId);
        }
    }

    // Create a new profile
    @PostMapping
    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile) {
        try {
            Profile createdProfile = profileService.createProfile(profile);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProfile);
        } catch (Exception e) {
            // Log error and return bad request response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }

    // Update an existing profile
    @PutMapping("/user/{userId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long userId, @RequestBody Profile updatedProfile) {
        try {
            Profile updated = profileService.updateProfile(userId, updatedProfile);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            // Log error and return meaningful message
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profile not found for user with ID: " + userId);
        }
    }
}
