package com.project.HarvestHub.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.HarvestHub.model.Login;
import com.project.HarvestHub.model.PasswordResetToken;
import com.project.HarvestHub.repository.PasswordResetTokenRepository;
import com.project.HarvestHub.repository.UserRepository;

@Service
public class PasswordResetTokenService {
	
	@Autowired
    private JavaMailSender mailSender;
	@Autowired
	private PasswordResetTokenRepository  tokenRepository;
	@Autowired
	private UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	
	public String generateResetToken(String email) {
        Login user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(1);

        PasswordResetToken resetToken = new PasswordResetToken(null,token,expiryDate, user);
        tokenRepository.save(resetToken);

        sendResetEmail(user.getEmail(), token);

        return "Password reset link sent to your email.";
    }

    private void sendResetEmail(String email, String token) {
        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Reset Your Password");
        message.setText("Click the link to reset your password: " + resetLink);
        mailSender.send(message);
    }

    public String resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
            .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token has expired");
        }

        Login user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken);

        return "Password reset successful.";
    }

}
