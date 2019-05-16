package com.backend.smartmarks.controller;

import java.util.TreeSet;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.smartmarks.exception.ApiResponse;
import com.backend.smartmarks.exception.ResourceNotFoundException;
import com.backend.smartmarks.model.Bookmark;
import com.backend.smartmarks.model.Tag;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.payload.BookmarkPayload;
import com.backend.smartmarks.payload.BookmarkTagPayload;
import com.backend.smartmarks.payload.TagPayload;
import com.backend.smartmarks.repository.BookmarkRepository;
import com.backend.smartmarks.repository.TagRepository;
import com.backend.smartmarks.repository.UserRepository;
import com.backend.smartmarks.security.UserPrincipal;

@RestController
@RequestMapping("api/tags")
@CrossOrigin(origins = "http://localhost:3000")
public class TagController {
	
	@Autowired
	TagRepository tagRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	BookmarkRepository bookmarkRepository;
	
	@GetMapping("/all")
	public ResponseEntity<TreeSet<TagPayload>> getTags(@AuthenticationPrincipal UserPrincipal principal) {
		User user = userRepository.findById(principal.getId())
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", principal.getId()));

		TreeSet<TagPayload> tags = user.getBookmarks()
				.stream()
				.flatMap(bookmark -> bookmark.getTags().stream())
				.map(tag -> new TagPayload(tag.getTagName(), tag.getId(), tag.getBookmarks().size()))
				.collect(Collectors.toCollection(TreeSet::new));
		return ResponseEntity.ok().body(tags);
	}
	@PostMapping("/similar/{id}")
	public ResponseEntity<TreeSet<BookmarkPayload>> getSimilar(@AuthenticationPrincipal UserPrincipal currentUser, 
																@PathVariable Long id) {
		User user = userRepository.findById(currentUser.getId())
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
		Tag tag = tagRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Tag", "id", id));
		
		TreeSet<BookmarkPayload> bookmarks = tag.getBookmarks().stream()
				.map(b -> 
				new BookmarkPayload(b.getName(), b.getUrl(), b.getCreatedAt(), user.getFavourites().contains(b)))
				.collect(Collectors.toCollection(TreeSet::new));
		return ResponseEntity.accepted().body(bookmarks);
	} 
	@PostMapping("/addTag")
	public ResponseEntity<?> addTag(@AuthenticationPrincipal UserPrincipal currentUser, @RequestBody BookmarkTagPayload b) {
		Tag tag = tagRepository.findByTagNameIgnoreCase(b.getTagName()).orElse(new Tag(b.getTagName()));
		Bookmark bookmark = bookmarkRepository.findByUrl(b.getBookmark())
				.orElseThrow(() -> new ResourceNotFoundException("Bookmark", "url", b.getBookmark()));
		
		if (!(bookmark.getTags().contains(tag))) {
			bookmark.addTag(tag);
			bookmarkRepository.save(bookmark);
			TreeSet<TagPayload> tags = bookmark.getTags().stream()
					.map(t -> new TagPayload(t.getTagName()))
					.collect(Collectors.toCollection(TreeSet::new));
			return ResponseEntity.ok(tags);	
		}
		else {
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ApiResponse(false, "Tag already exists."));
		}
	}
	
	
}
