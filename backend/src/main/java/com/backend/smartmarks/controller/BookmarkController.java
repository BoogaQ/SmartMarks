package com.backend.smartmarks.controller;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
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
import com.backend.smartmarks.model.Tag;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.payload.BookmarkPayload;
import com.backend.smartmarks.payload.TagPayload;
import com.backend.smartmarks.repository.BookmarkRepository;
import com.backend.smartmarks.repository.TagRepository;
import com.backend.smartmarks.repository.UserRepository;
import com.backend.smartmarks.security.UserPrincipal;
import com.textrazor.AnalysisException;
import com.textrazor.NetworkException;
import com.textrazor.TextRazor;
import com.textrazor.annotations.AnalyzedText;
import com.textrazor.annotations.Entity;
import com.textrazor.annotations.ScoredCategory;
import com.textrazor.annotations.Topic;

@RestController
@RequestMapping("api/bookmarks")
@CrossOrigin(origins = "http://localhost:3000")
public class BookmarkController {
	
	@Autowired
	BookmarkRepository bookmarkRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TagRepository tagRepository;
	
	@PostMapping("/add")
	public ResponseEntity<?> addBookmark(@AuthenticationPrincipal UserPrincipal currentUser, 
										@RequestBody BookmarkPayload bookmark) {
		User user = userRepository.findById(currentUser.getId())
				.orElseThrow(()-> new BadRequestException("Bad request."));
		Bookmark b = bookmarkRepository.findByUrl(bookmark.getUrl()).orElse(new Bookmark(bookmark.getUrl(), bookmark.getName()));
		List<TagPayload> tags = bookmark.getTags();
		if (tags != null) {
			for (Iterator<TagPayload> it = tags.iterator(); it.hasNext();) {
				TagPayload t = it.next();
				Tag saved = tagRepository.findByTagName(t.getTagName()).orElse(new Tag(t.getTagName()));
				if (!b.getTags().contains(saved)) {
					b.addTag(saved);
					tagRepository.save(saved);
				}		
			}
		}		
		if (!(user.getBookmarks().contains(bookmark))) {		
			user.addBookmark(b);
			userRepository.save(user);
			return ResponseEntity.accepted().body(new ApiResponse(true, "Bookmark added"));
		} else {
			return ResponseEntity.badRequest().body(new ApiResponse(false, "Bookmark already exists."));
			}	
		}

	@PostMapping("/remove")
	public ResponseEntity<?> removeBookmark(@AuthenticationPrincipal UserPrincipal currentUser, @RequestBody String url) {
		User user = userRepository.findById(currentUser.getId())
				.orElseThrow(()-> new BadRequestException("User not found."));
		Bookmark b = bookmarkRepository.findByUrl(url)
				.orElseThrow(() -> new BadRequestException("Bookmark not found."));
		if (user.getBookmarks().contains(b)) {
			user.removeBookmark(b);
			userRepository.save(user);
			return ResponseEntity.accepted().body(new ApiResponse(true, "Bookmark deleted"));
		}
		return ResponseEntity.badRequest().body(new ApiResponse(false, "User by ID " + currentUser.getId() + "doesn't contain said bookmark."));
	}
	@PostMapping("/analyse")
	public ResponseEntity<?> analyse(@RequestBody String url) throws NetworkException, AnalysisException {
		
		TextRazor client = new TextRazor("ab2f1c71030b2fc1c2700f585a05cb2f41462a06748ba50a19b7f9ac");	
		
		client.addExtractor("topics");
		client.setCleanupMode("stripTags");
		client.setClassifiers(Arrays.asList("textrazor_newscodes"));
		List<String> topics;
		try {		
			AnalyzedText response = client.analyzeUrl(url);
			topics = response.getResponse().getTopics()
					.stream()
					.limit(5)
					.map(n -> n.getLabel())
					.collect(Collectors.toList());
			
			return ResponseEntity.accepted().body(topics);
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Error>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
}
