package com.backend.smartmarks.controller;


import java.util.HashMap;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:5001")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/register")
	public HashMap<String, Object> createUser(@Valid @RequestBody User user) {
		HashMap<String, Object> message = new HashMap<>();
		User existing = userRepository.findByEmailIdIgnoreCase(user.getEmail());
		if (existing != null) {
			message.put("error", true);
			message.put("message", "Email Already Exists.");
		} else {
			userRepository.save(user);
			message.put("error", false);
			message.put("message", "success");
		}
		return message;

	}
	@PostMapping("/login")
	public HashMap<String, Object>  login(@Valid @RequestBody User user) {
		HashMap<String, Object> message = new HashMap<>();
		User existing = userRepository.findByEmailIdIgnoreCase(user.getEmail());
		
		if (existing.getPassword().equals(user.getPassword())) {
			message.put("error", false);
			message.put("message", "Success!");
		} else {
			message.put("error", true);
			message.put("message", "Email or password incorrect.");
		}
		return message;

		
	}
	
}
