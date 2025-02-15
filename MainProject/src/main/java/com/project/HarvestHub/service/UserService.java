package com.project.HarvestHub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.HarvestHub.model.Login;
import com.project.HarvestHub.repository.UserRepository;

@Service
public class UserService {

    @Autowired    
    UserRepository UserRepo;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    public List<Login> getAllProduct() {
        return UserRepo.findAll();
    }

    public Login registerUser(Login user) {
        Optional<Login> existingUser = UserRepo.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        // Encrypt the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return UserRepo.save(user);
    }
    public Login getLoginById(Long id) {
        return UserRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    public Login loginUser(String email, String password) {
        Optional<Login> user = UserRepo.findByEmail(email);
        
        if (user.isPresent()) {
            Login foundUser = user.get();

            // Check if the user is blocked
            if (foundUser.isBlocked()) {
                throw new RuntimeException("User is blocked. Contact admin.");
            }

            // Check password
            if (passwordEncoder.matches(password, foundUser.getPassword())) {
                return foundUser;
            }
        }

        throw new RuntimeException("Invalid email or password");
    }


    // New method to fetch user profile by ID
    public Login getUserById(Long id) {
        Optional<Login> user = UserRepo.findById(id);
        return user.orElse(null); // If not found, return null
    }
    public void blockUser(Long id) {
        Login user = UserRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setBlocked(true);
        UserRepo.save(user);
    }

    // Method to unblock user
    public void unblockUser(Long id) {
        Login user = UserRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setBlocked(false);
        UserRepo.save(user);
    }

    

}
