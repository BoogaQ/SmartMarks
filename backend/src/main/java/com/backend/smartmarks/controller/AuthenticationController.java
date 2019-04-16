package com.backend.smartmarks.controller;
import java.net.URI;
import java.util.ArrayList;
import java.util.Set;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backend.smartmarks.exception.ApiResponse;
import com.backend.smartmarks.exception.BadRequestException;
import com.backend.smartmarks.model.JWTAuthenticationResponse;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.payload.LoginRequest;
import com.backend.smartmarks.payload.RegistrationRequest;
import com.backend.smartmarks.payload.UserSummaryPayload;
import com.backend.smartmarks.security.TokenHelper;
import com.backend.smartmarks.security.UserPrincipal;
import com.backend.smartmarks.repository.UserRepository;
import com.backend.smartmarks.model.Bookmark;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
	
	@Autowired
    AuthenticationManager authenticationManager;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
    PasswordEncoder passwordEncoder;
	
    @Autowired
    TokenHelper tokenHelper;
    
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("/register")
	public ResponseEntity<?> createUser(@Valid @RequestBody RegistrationRequest rq) {
		
		if (userRepository.existsByUsername(rq.getUsername())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Username already taken."));
		}
		if(userRepository.existsByEmail(rq.getEmail())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Email already in use."));
        }
		
		User user = new User(rq.getUsername(), rq.getEmail(), rq.getPassword());
		user.setPassword(passwordEncoder.encode(rq.getPassword()));
		
		User result = userRepository.save(user);
		
		// Redirect user after successful registration
		URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{id}")
                .buildAndExpand(result.getId()).toUri();
		
		final HttpHeaders headers = new HttpHeaders();
		headers.set("Access-Control-Expose-Headers", "Location");
	    System.out.print(headers);
		// HTTP responses provide links only when redirected. Create response entity that redirects to user dashboard and reports success.
        return ResponseEntity.created(location).headers(headers).body(new ApiResponse(true, "User registered successfully"));

	}
	@PostMapping("/login")
	public ResponseEntity<?> login (@Valid @RequestBody LoginRequest loginRequest) throws BadRequestException {
		try {
			System.out.println(loginRequest.getUsernameOrEmail());
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(),
															loginRequest.getPassword()));
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = tokenHelper.generateToken(authentication);
			return ResponseEntity.ok(new JWTAuthenticationResponse(jwt));
		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ApiResponse(false, "Invalid credentials."));
		}
		
	}	
}
