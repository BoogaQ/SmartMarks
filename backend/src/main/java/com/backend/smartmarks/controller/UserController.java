package com.backend.smartmarks.controller;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.backend.smartmarks.exception.ApiResponse;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/register")
	public ApiResponse createUser(@Valid @RequestBody User user) {
		ApiResponse response;
		User existing = userRepository.findByEmailIdIgnoreCase(user.getEmail());
		if (existing != null) {
			response = new ApiResponse(false, "There is an account already registered with that email.");
		} else {
			userRepository.save(user);
			response = new ApiResponse(true, "Account created!");
		}
		return response;

	}
	@PostMapping("/login")
	public ApiResponse login(@Valid @RequestBody User user) {		
		User existing = userRepository.findByEmailIdIgnoreCase(user.getEmail());
		ApiResponse response;
		try {
			if (existing!=null && existing.getPassword().equals(user.getPassword())) {
				response = new ApiResponse(true, "Login Successful!");
			} else {
				response = new ApiResponse(false, "Email or password incorrect.");
			}
		} catch (Exception e) {
			response = new ApiResponse(false, "An error has occured.");
		}	
		return response;	
	}	
}
