package com.backend.smartmarks.controller;

import java.util.Collections;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/register")
	public Map<String, String> createUser(@Valid @RequestBody User user) {
		if (userRepository.existsById(user.getEmail())) {
			return Collections.singletonMap("success", "false");
		} else {
			userRepository.save(user);
			return Collections.singletonMap("success", "true");
		}
	}
	
}
