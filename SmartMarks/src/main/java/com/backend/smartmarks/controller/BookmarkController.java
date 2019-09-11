package com.backend.smartmarks.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.smartmarks.exception.ApiResponse;
import com.backend.smartmarks.exception.BadRequestException;
import com.backend.smartmarks.exception.ResourceNotFoundException;
import com.backend.smartmarks.model.Bookmark;
import com.backend.smartmarks.model.Tag;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.payload.BookmarkPayload;
import com.backend.smartmarks.payload.TagPayload;
import com.backend.smartmarks.repository.BookmarkRepository;
import com.backend.smartmarks.repository.TagRepository;
import com.backend.smartmarks.repository.UserRepository;
import com.backend.smartmarks.security.TokenHelper;
import com.backend.smartmarks.security.UserPrincipal;
import com.textrazor.AnalysisException;
import com.textrazor.NetworkException;
import com.textrazor.TextRazor;
import com.textrazor.annotations.AnalyzedText;

@RestController
@RequestMapping("api/bookmarks")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class BookmarkController {
	
	@Autowired
	BookmarkRepository bookmarkRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TagRepository tagRepository;
	
	private static final Logger logger = LoggerFactory.getLogger(BookmarkController.class);
	
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
		if (!(user.getBookmarks().contains(b))) {		
			user.addBookmark(b);
			userRepository.save(user);
			return ResponseEntity.accepted().body(new ApiResponse(true, "Bookmark added"));
		} else {
			return ResponseEntity.badRequest().body(new ApiResponse(false, "Bookmark already exists."));
			}	
		}

	@PostMapping("/remove")
	public ResponseEntity<ApiResponse> removeBookmark(@AuthenticationPrincipal UserPrincipal currentUser, @RequestBody String url) {
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
	/*
	@PostMapping("/addProject/")
	public ResponseEntity<?> addProject(@AuthenticationPrincipal UserPrincipal currentUser, @RequestBody String url) {
		
	}
	*/
	
	@GetMapping("/favourites")
	public ResponseEntity<TreeSet<BookmarkPayload>> getFavourites(@AuthenticationPrincipal UserPrincipal currentUser) {
		User user = userRepository.findById(currentUser.getId())
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
		
		TreeSet<BookmarkPayload> payload = user.getFavourites().stream()
				.map(b -> new BookmarkPayload(b.getName(), b.getUrl(), b.getCreatedAt(), true))
				.collect(Collectors.toCollection(TreeSet::new));
		return ResponseEntity.accepted().body(payload);
	}
	
	@PostMapping("/favourites/tagUrl={url}")
	public ResponseEntity<?> addFavourite(@AuthenticationPrincipal UserPrincipal currentUser, @RequestParam("url") String url) throws UnsupportedEncodingException {
		System.out.print(url);
		String decoded = URLDecoder.decode(url, "UTF-8");
		System.out.print(decoded);
		User user = userRepository.findById(currentUser.getId())
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
		
		Bookmark b = bookmarkRepository.findByUrl(decoded)
				.orElseThrow(() -> new ResourceNotFoundException("Bookmark", "url", url));
		if (!(user.getFavourites().contains(b))) {
			user.addFavourite(b);
			userRepository.save(user);		
		} else {
			user.removeFavourite(b);
			userRepository.save(user);
		}
		return ResponseEntity.accepted().body(new ApiResponse(true, "Operation successful"));		
	}
	
	@PostMapping("/analyse")
	public ResponseEntity<?> analyse(@RequestBody String url) throws NetworkException, AnalysisException {
		TextRazor client = new TextRazor("ab2f1c71030b2fc1c2700f585a05cb2f41462a06748ba50a19b7f9ac");	
		client.addExtractor("topics");
		client.setCleanupMode("stripTags");
		client.setClassifiers(Arrays.asList("textrazor_newscodes"));
		List<String> topics = null;
		try {		
			AnalyzedText response = client.analyzeUrl(url);
			topics = response.getResponse().getTopics()
					.stream()
					.limit(5)
					.map(n -> n.getLabel())
					.collect(Collectors.toList());
					
			return ResponseEntity.accepted().body(topics);
			
		} catch (Exception e) {
			logger.error("Error: " + e.getMessage());
			return ResponseEntity.badRequest().body(topics);
		}
		
	}
}
