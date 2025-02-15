package com.project.HarvestHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.HarvestHub.model.Login;
import com.project.HarvestHub.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/api/users")
    public List<Login> showAllProduct() {
        return userService.getAllProduct();
    }
    @PostMapping("/api/users/{id}/block")
    public ResponseEntity<?> blockUser(@PathVariable Long id) {
        try {
            userService.blockUser(id);
            return ResponseEntity.ok("User blocked successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Unblock user
    @PostMapping("/api/users/{id}/unblock")
    public ResponseEntity<?> unblockUser(@PathVariable Long id) {
        try {
            userService.unblockUser(id);
            return ResponseEntity.ok("User unblocked successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
  

    @PostMapping("/api/register")
    public ResponseEntity<String> register(@RequestBody Login user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("Registration successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/api/login")
    public ResponseEntity<Object> login(@RequestBody Login loginData) {
        try {
            Login user = userService.loginUser(loginData.getEmail(), loginData.getPassword());

            // Prepare the response data
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setMessage(getWelcomeMessage(user.getRole()));
            loginResponse.setId(user.getId());  // Include the user ID in the response

            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/api/user/{id}")
    public ResponseEntity<Login> getUserProfileById(@PathVariable Long id) {
        try {
            Login user = userService.getUserById(id); 
            if (user != null) {
                return ResponseEntity.ok(user); 
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); 
        }
    }

    private String getWelcomeMessage(String role) {
        switch (role) {
            case "Admin":
                return "Welcome to the Admin Dashboard";
            case "Consumer":
                return "Welcome to the Consumer Dashboard";
            case "Farmer":
                return "Welcome to the Farmer Dashboard";
            default:
                throw new RuntimeException("Invalid role");
        }
    }

    // A DTO to structure the response
    public static class LoginResponse {
        private String message;
        private Long id;  // Assuming the user has a Long id field

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }
    }
}
