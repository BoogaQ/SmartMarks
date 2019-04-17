package com.backend.smartmarks.payload;

import java.util.Date;
import java.util.Set;
import java.util.TreeSet;

import javax.validation.constraints.NotBlank;

import com.backend.smartmarks.model.User;

public class ProjectPayload implements Comparable<ProjectPayload> {
	
	@NotBlank
	private String name;
	
	private Long id;
	
	private Set<BookmarkPayload> bookmarks = new TreeSet<>();
	
	private Date createdAt;
	
	public ProjectPayload() {}
	
	public ProjectPayload(String name) {
		this.name = name;
	}
	
	public ProjectPayload(Long id, String name, Date created) {
		this.name = name;
		createdAt = created;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public void addBookmarkPayload(BookmarkPayload b) {
		bookmarks.add(b);
	}
	public Set<BookmarkPayload> getBookmarks() {
		return bookmarks;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	@Override
	public int compareTo(ProjectPayload p) {
		return this.getCreatedAt().compareTo(p.getCreatedAt());
	}
}
