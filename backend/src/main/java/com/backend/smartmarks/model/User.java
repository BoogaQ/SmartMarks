package com.backend.smartmarks.model;


import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.NaturalId;

import java.util.HashSet;
import java.util.Set;



@Entity
@Table(name="users")
public class User extends AuditModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
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
	        CascadeType.MERGE
	    })
	@JoinTable(name="user_bookmark", 
				joinColumns = @JoinColumn(name="user_id", referencedColumnName="id"),
				inverseJoinColumns = @JoinColumn(name="bookmark_id", referencedColumnName="id"))
	private Set<Bookmark> bookmarks = new HashSet<>();
	
	public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    
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
}
