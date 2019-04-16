package com.backend.smartmarks.model;


import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.NaturalId;

import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;



@Entity
@Table(name="users")
public class User extends AuditModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@NotBlank
	private String username;
	
	@NaturalId
	@NotBlank
	@Email
	private String email;
	
	@NotBlank
	private String password;
	
	public User() {

    }
	
	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}
	
	@ManyToMany(cascade = {
	        CascadeType.PERSIST,
	        CascadeType.MERGE,
	        CascadeType.REMOVE
	    })
	@JoinTable(name="user_bookmark", 
				joinColumns = @JoinColumn(name="user_id", referencedColumnName="id"),
				inverseJoinColumns = @JoinColumn(name="bookmark_id", referencedColumnName="id"))
	private Set<Bookmark> bookmarks = new HashSet<>();
	
	@ManyToMany
	@JoinTable(name="favourites",
				joinColumns = @JoinColumn(name="user_id", referencedColumnName="id"),
				inverseJoinColumns = @JoinColumn(name="bookmark_id", referencedColumnName="id"))
	private Set<Bookmark> favourites = new HashSet<>();
	
	@OneToMany(mappedBy="user", cascade = CascadeType.ALL)
	private Set<Project> projects = new HashSet<>();
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUSername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return this.password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public void addBookmark(Bookmark b) {
		bookmarks.add(b);
		b.getUsers().add(this);
	}
	public void removeBookmark(Bookmark b) {
		bookmarks.remove(b);
		b.getUsers().remove(this);
	}
	
	public Set<Bookmark> getBookmarks() {
		return bookmarks;
	}
	public Set<Bookmark> getFavourites() {
		return this.favourites;
	}
	public Set<Project> getProjects() {
		return projects;
	}
	public void addFavourite(Bookmark b) {
		favourites.add(b);
		b.getFavouritedUsers().add(this);
	}
	public void removeFavourite(Bookmark b) {
		favourites.remove(b);
		b.getFavouritedUsers().remove(this);
	}
	public void addProject(Project p) {
		projects.add(p);
		p.setUser(this);
	}
	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof User)) {
			return false;
		}
		User u = (User) o;
		System.out.println(this.getEmail() == u.getEmail());
		System.out.println(this.getEmail().contentEquals(u.getEmail()));
		return this.getEmail().contentEquals(u.getEmail());
	}
	@Override
	public int hashCode() {
		int result = 17;
		
		result = 31 * result + username.hashCode();
		result = 31 * result + email.hashCode();
		result = 31 * result + password.hashCode();
		return result;
	}
}
