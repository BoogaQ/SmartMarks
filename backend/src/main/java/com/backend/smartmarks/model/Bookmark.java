package com.backend.smartmarks.model;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;


@Entity
@Table(name="bookmarks")
public class Bookmark extends AuditModel implements Comparable<Bookmark> {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	@NotBlank
	private String name;
	
	@NotBlank
	private String url;
	
	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name="bookmark_tag", joinColumns = @JoinColumn(name="bookmark_id", referencedColumnName="id"),
									inverseJoinColumns = @JoinColumn(name="tag_id", referencedColumnName="id"))
	private Set<Tag> tags = new HashSet<>();
	
	@ManyToMany(mappedBy="favourites")
	private Set<User> favouritedUsers = new HashSet<>();
	
	@ManyToMany(mappedBy="bookmarks")
	private Set<User> users = new HashSet<>();
	
	public Bookmark() {
		
	}
	public Bookmark(String url, String name) {
		this.name = name;
		this.url = url;
	}
	
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
	public Set<Tag> getTags() {
		return this.tags;
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
	
	public Set<User> getFavouritedUsers() {
		return favouritedUsers;
	}
	public void addFavourite(User u) {
		this.favouritedUsers.add(u);
		u.getFavourites().add(this);
	}

	@Override
	public int compareTo(Bookmark o) {
		System.out.println(this.getCreatedAt().compareTo(o.getCreatedAt()));
		return this.getCreatedAt().compareTo(o.getCreatedAt());
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
	
}
