package com.backend.smartmarks.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.smartmarks.exception.BadRequestException;
import com.backend.smartmarks.model.Bookmark;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.payload.UserSummaryPayload;
import com.backend.smartmarks.repository.UserRepository;
import com.backend.smartmarks.security.UserPrincipal;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
    @GetMapping("/user/me")
    public UserSummaryPayload getCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
    	UserSummaryPayload userSummary = new UserSummaryPayload(currentUser.getId(), currentUser.getEmail(), currentUser.getUsername());
    	return userSummary;
    	
    }
    
    @GetMapping("/users/{id}")
    public Set<Bookmark> retrieveBookmarks(@PathVariable(value="id") Long id) {
    	User user = userRepository.findById(id)
    			.orElseThrow(() -> new BadRequestException("No user by ID: " + id));
    	return user.getBookmarks();
    }
}
