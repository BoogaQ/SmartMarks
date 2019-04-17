package com.backend.smartmarks.controller;

import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.smartmarks.exception.ApiResponse;
import com.backend.smartmarks.exception.ResourceNotFoundException;
import com.backend.smartmarks.model.Bookmark;
import com.backend.smartmarks.model.Project;
import com.backend.smartmarks.model.User;
import com.backend.smartmarks.payload.BookmarkPayload;
import com.backend.smartmarks.payload.BookmarkProjectPayload;
import com.backend.smartmarks.payload.ProjectPayload;
import com.backend.smartmarks.repository.BookmarkRepository;
import com.backend.smartmarks.repository.ProjectRepository;
import com.backend.smartmarks.repository.UserRepository;
import com.backend.smartmarks.security.UserPrincipal;

@RestController
@RequestMapping("api/projects")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class ProjectController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ProjectRepository projectRepository;
	
	@Autowired
	BookmarkRepository bookmarkRepository;
	
	@PostMapping("/addProject")
    public ResponseEntity<?> addProject(@AuthenticationPrincipal UserPrincipal currentUser, @RequestBody String name) {
    	User user = userRepository.findById(currentUser.getId())
    			.orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + currentUser.getId()));
    	Project p = new Project(name);;
    	if (!(projectRepository.existsByName(name))) {
    		user.addProject(p);
        	userRepository.save(user);
        	return ResponseEntity.ok(new ApiResponse(true, "Project added succesfully: " + p.getName()));
    	} else {
    		return ResponseEntity.badRequest().body(new ApiResponse(false, "Project with name already exists: " + p.getName()));
    	}
    }
	
	@GetMapping("/getProjects")
	public ResponseEntity<?> getProject(@AuthenticationPrincipal UserPrincipal currentUser) {
		User user = userRepository.findById(currentUser.getId())
    			.orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + currentUser.getId()));
		
		Set<ProjectPayload> projects = user.getProjects()
											.stream()
											.map(b -> new ProjectPayload(b.getId(), b.getName(), b.getCreatedAt()))
											.collect(Collectors.toCollection(TreeSet::new));
		return ResponseEntity.ok(projects);
	}
	
	@PostMapping("/addToProject")
	public ResponseEntity<?> addToProject(@AuthenticationPrincipal UserPrincipal currentUser,
											@RequestBody BookmarkProjectPayload bp) {	
		User user = userRepository.findById(currentUser.getId())
    			.orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + currentUser.getId()));
		Project project = projectRepository.findByNameAndUserId(bp.getProjectName(), user.getId())
				.orElse(new Project(bp.getProjectName(), user));
		Bookmark bookmark = bookmarkRepository.findByUrl(bp.getBookmark())
				.orElseThrow(() -> new ResourceNotFoundException("Bookmark", "url", bp.getBookmark()));
		
		if (!(project.getBookmarks().contains(bookmark))) {
			project.addBookmark(bookmark);
			userRepository.save(user);
			return ResponseEntity.ok(new ApiResponse(true, "Bookmark added to project successfully."));
		} else {
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ApiResponse(false, "Project contains bookmark already."));
		}
	}
	
	@PostMapping("/retrieveProjectBookmarks")
	public ResponseEntity<?> retrieveBookmarks(@AuthenticationPrincipal UserPrincipal currentUser,
												@RequestBody ProjectPayload pl) {
	System.out.println(pl.getName());
	User user = userRepository.findById(currentUser.getId())
			.orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + currentUser.getId()));
	Project project = projectRepository.findByNameAndUserId(pl.getName(), user.getId())
			.orElse(new Project(pl.getName(), user));
	TreeSet<BookmarkPayload> bookmarks = project.getBookmarks().stream()
											.map(b -> new BookmarkPayload(b.getName(), b.getUrl(), b.getCreatedAt(), user.getFavourites().contains(b)))
											.collect(Collectors.toCollection(TreeSet::new));
	return ResponseEntity.ok(bookmarks);
	}
}
