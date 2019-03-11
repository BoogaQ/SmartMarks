package com.backend.smartmarks.controller;
import java.net.URI;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backend.smartmarks.exception.ApiResponse;
import com.backend.smartmarks.model.JWTAuthenticationResponse;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.payload.LoginRequest;
import com.backend.smartmarks.payload.RegistrationRequest;
import com.backend.smartmarks.security.TokenHelper;
import com.backend.smartmarks.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
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
			return new ResponseEntity(new ApiResponse(false, "Username already taken."), HttpStatus.BAD_REQUEST);
		}
		if(userRepository.existsByEmail(rq.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
		
		User user = new User(rq.getUsername(), rq.getEmail(), rq.getPassword());
		user.setPassword(passwordEncoder.encode(rq.getPassword()));
		
		User result = userRepository.save(user);
		
		URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));

	}
	@PostMapping("/login")
	public ResponseEntity<?> login (@Valid @RequestBody LoginRequest loginRequest) {
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(),
														loginRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenHelper.generateToken(authentication);
		return ResponseEntity.ok(new JWTAuthenticationResponse(jwt));
	}	
}
