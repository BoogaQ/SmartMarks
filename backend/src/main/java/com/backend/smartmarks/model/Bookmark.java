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

	
	@NotBlank
	private String name;
	
	@NotBlank
	private String url;
	
	@ManyToMany(cascade=CascadeType.PERSIST)
	@JoinTable(name="bookmark_tag", joinColumns = @JoinColumn(name="bookmark_id", referencedColumnName="id"),
									inverseJoinColumns = @JoinColumn(name="tag_id", referencedColumnName="id"))
	private Set<Tag> tags = new HashSet<>();
	
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
	public void addTag(Tag t) {
		tags.add(t);
		t.getBookmarks().add(this);
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
		return this.url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	@Override
	public boolean equals(Object o) {
		
		if (o == this) {
			return true;
		}
		if (!(o instanceof Bookmark)) {
			return false;
		}
		Bookmark b = (Bookmark) o;
		return this.getUrl().contentEquals(b.getUrl());
	}
	@Override
	public int hashCode() {
		int result = 17;
		result = 31 * result + name.hashCode();
		result = 31 * result + url.hashCode();
		return result;
	}
}
