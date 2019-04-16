package com.backend.smartmarks.controller;

import java.util.Set;
import java.util.TreeSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.smartmarks.exception.ApiResponse;
import com.backend.smartmarks.model.Bookmark;
import com.backend.smartmarks.model.Project;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.payload.BookmarkPayload;
import com.backend.smartmarks.payload.TagPayload;
import com.backend.smartmarks.payload.UserSummaryPayload;
import com.backend.smartmarks.repository.ProjectRepository;
import com.backend.smartmarks.repository.UserRepository;
import com.backend.smartmarks.security.TokenHelper;
import com.backend.smartmarks.security.UserPrincipal;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ProjectRepository projectRepository;
	
    @GetMapping("/user/me")
    public UserSummaryPayload getCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
    	try {
    		UserSummaryPayload userSummary = new UserSummaryPayload(currentUser.getId(), currentUser.getEmail(), currentUser.getUsername());
        	return userSummary;
    	} catch (NullPointerException e) {
    		logger.error("Could not get user.");
    		return null;
    	}
    }
    
    @GetMapping("/user/bookmarks")
    public @ResponseBody ResponseEntity<?> retrieveBookmarks(@AuthenticationPrincipal UserPrincipal currentUser) {
    	User user = userRepository.findById(currentUser.getId())
    			.orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + currentUser.getId()));
    	Set<BookmarkPayload> bookmarks = new TreeSet<>();
    	
    	for (Bookmark b : user.getBookmarks()) {
    		BookmarkPayload payload = new BookmarkPayload(b.getName(), b.getUrl(), b.getCreatedAt(), user.getFavourites().contains(b));
    		if (b.getTags().size() > 0) {
    			b.getTags().stream()
    						.forEach(n -> payload.addTag(new TagPayload(n.getTagName(), n.getId(), b.getTags().size())));
    		}
    		bookmarks.add(payload);
    	}
    	return ResponseEntity.accepted().body(bookmarks);	
    }
 
}
