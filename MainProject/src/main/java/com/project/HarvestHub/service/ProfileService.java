package com.project.HarvestHub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.HarvestHub.model.Profile;
import com.project.HarvestHub.model.Login;
import com.project.HarvestHub.repository.ProfileRepository;
import com.project.HarvestHub.repository.UserRepository;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository loginRepository;

    // ✅ New method: Fetch Profile by Email
    public Profile getProfileByEmail(String email) {
        Login user = loginRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        return profileRepository.findByUserId(user.getId());
    }
    // Get profile by user ID
    public Profile getProfileByUserId(Long userId) {
        // Check if user exists
        Login user = loginRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Fetch profile by user
        Optional<Profile> optionalProfile = profileRepository.findByUser(user);
        if (optionalProfile.isPresent()) {
            return optionalProfile.get();
        } else {
            throw new RuntimeException("Profile not found for user id: " + userId);
        }
    }

    // Create profile
    public Profile createProfile(Profile profile) {
        // Check if user exists before creating profile
        Login user = loginRepository.findById(profile.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        profile.setUser(user);  // Link the profile to the user
        
        // Save the profile and return the saved entity
        return profileRepository.save(profile);  
    }

    // Update profile
    public Profile updateProfile(Long userId, Profile updatedProfile) {
        // Check if user exists before updating profile
        Login user = loginRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Fetch the existing profile for the user
        Profile existingProfile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found for user id: " + userId));

        // Update the existing fields
        existingProfile.setPhoneNumber(updatedProfile.getPhoneNumber());
        existingProfile.setAddress(updatedProfile.getAddress());
        existingProfile.setState(updatedProfile.getState());
        existingProfile.setModeOfDelivery(updatedProfile.getModeOfDelivery());
        existingProfile.setFarmerImage(updatedProfile.getFarmerImage());

        // ✅ Updating newly added fields
        existingProfile.setAccountNumber(updatedProfile.getAccountNumber());
        existingProfile.setIfscCode(updatedProfile.getIfscCode());
        existingProfile.setBranchName(updatedProfile.getBranchName());
        existingProfile.setBankName(updatedProfile.getBankName());
        existingProfile.setQrCodeImage(updatedProfile.getQrCodeImage());

        // Save the updated profile
        return profileRepository.save(existingProfile);  
    }
}
