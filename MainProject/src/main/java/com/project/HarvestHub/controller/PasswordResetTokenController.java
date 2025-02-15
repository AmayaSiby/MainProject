package com.project.HarvestHub.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.HarvestHub.service.PasswordResetTokenService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

public class PasswordResetTokenController {

	@Autowired
	private PasswordResetTokenService authService;
	
	
	
	
	@PostMapping("/api/forgot-password")
	public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> body) {
	    try {
	        String email = body.get("email");  // Correctly extracting from the body
	        String response = authService.generateResetToken(email);
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	    }
	}

    // Reset password endpoint to accept JSON with token and newPassword
    @PostMapping("/api/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> body) {
        try {
            // Extract the token and new password from the request body
            String token = body.get("token");
            String newPassword = body.get("newPassword");
            // Reset password using the token and new password
            String response = authService.resetPassword(token, newPassword);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
