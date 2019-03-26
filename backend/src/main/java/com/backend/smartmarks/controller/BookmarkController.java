package com.backend.smartmarks.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.smartmarks.exception.ApiResponse;
import com.backend.smartmarks.exception.BadRequestException;
import com.backend.smartmarks.model.Bookmark;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.repository.BookmarkRepository;
import com.backend.smartmarks.repository.UserRepository;
import com.backend.smartmarks.security.UserPrincipal;

@RestController
@RequestMapping("api/bookmarks")
@CrossOrigin(origins = "http://localhost:3000")
public class BookmarkController {
	
	@Autowired
	BookmarkRepository bookmarkRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/add")
	public ResponseEntity<?> addBookmark(@AuthenticationPrincipal UserPrincipal currentUser, 
										@RequestBody Bookmark bookmark) {
		User user = userRepository.findById(currentUser.getId())
				.orElseThrow(()-> new BadRequestException("Bad request."));
		Bookmark b = bookmarkRepository.findByUrl(bookmark.getUrl()).orElse(bookmark);
		user.addBookmark(b);
		userRepository.save(user);
		if (!(user.getBookmarks().contains(bookmark))) {		
			bookmarkRepository.save(bookmark);
		} else {
			return ResponseEntity.badRequest().body(new ApiResponse(false, "Bookmark already exists."));
		}
		return ResponseEntity.accepted().body(new ApiResponse(true, "Bookmark added"));
	}
}
