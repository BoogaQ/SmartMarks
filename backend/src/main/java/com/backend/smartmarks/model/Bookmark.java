package com.backend.smartmarks.model;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;


@Entity
@Table(name="bookmarks")
public class Bookmark extends AuditModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String url;
	
	@NotBlank
	private String imageDirectory;
	
	@ManyToMany(mappedBy="bookmarks")
	private Set<User> users = new HashSet<>();
	
	public void addUser(User u) {
		users.add(u);
		u.getBookmarks().add(this);
	}
	public void removeUser(User u) {
		users.remove(u);
		u.getBookmarks().remove(this);
	}
	
	//Getters and setters
	public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
	public Set<User> getUsers() {
		return users;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return this.getUrl();
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getImageDirectory() {
		return imageDirectory;
	}
	public void setImageDirectory(String path) {
		imageDirectory = path;
	}
}
