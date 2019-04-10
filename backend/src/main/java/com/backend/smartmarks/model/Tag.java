package com.backend.smartmarks.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="tags")
public class Tag extends AuditModel {
	
	private float confidenceScore = 1;
	private String tagName;
	
	public Tag() {
		
	}
	public Tag(String tagName) {		
		this.tagName = tagName;
	}

	@ManyToMany(mappedBy="tags")
	private Set<Bookmark> bookmarks = new HashSet<>();
	
	public String getTagName() {
		return tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	public Set<Bookmark> getBookmarks() {
		return this.bookmarks;
	}
	public float getScore() {
		return this.confidenceScore;
	}
	public void setScore(float score) {
		confidenceScore = score;
	}
	@Override
	public String toString() {
		return tagName;
	}
}
