package com.project.HarvestHub;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration

public class SecurityConfig {
	 @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
         http.csrf(csrf -> csrf.disable())  // Disable CSRF for simplicity (not recommended for production)
                 .authorizeHttpRequests(auth -> auth
                                 .requestMatchers("/api/user/**","/api/users/**","/api/register", "/api/login","/api/profiles/**","/api/spices/**","/api/cart/**","/api/visitrequests/**","/api/knowledge-hub/**","/api/orders/**", "/api/orders/farmer/**","/api/cart-items/**","/api/forgot-password","/api/reset-password","/api/transactions/**","/api/comments/**").permitAll()  // Allow \access to these endpoints without authentication
                                 .anyRequest().authenticated()  // All other requests require authentication
                 )
         .logout(logout -> logout.permitAll());
	        return http.build();
	    }
	 @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	
}
