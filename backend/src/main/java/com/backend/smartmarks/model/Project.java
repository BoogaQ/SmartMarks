package com.backend.smartmarks.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

@Entity(name="projects")
public class Project extends AuditModel {
	
	@NotBlank
	String name;
	
	@ManyToOne
	@JoinColumn
	User user;
	
	public Project() {
		
	}
	public Project(String name) {
		this.name = name;
	}
	
	@ManyToMany(mappedBy="projects")
	private Set<Bookmark> bookmarksForProject = new HashSet<>();
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public Set<Bookmark> getBookmarks() {
		return this.bookmarksForProject;
	}
	public void addBookmark(Bookmark b) {
		bookmarksForProject.add(b);
		b.getProjects().add(this);
	}
	public User getUser() {
		return user;
	}
	public void setUser(User u) {
		this.user = u;
	}
}
