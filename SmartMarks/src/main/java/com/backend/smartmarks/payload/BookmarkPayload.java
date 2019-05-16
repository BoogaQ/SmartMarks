package com.backend.smartmarks.payload;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;


public class BookmarkPayload implements Comparable<BookmarkPayload>{
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String url;
	
	@NotBlank
	private Date createdAt;
	
	private boolean favourite = false;
	
	private List<TagPayload> tags;
	
	public BookmarkPayload(String name, String url, Date date, boolean favourite) {
		this.name = name;
		this.url = url;
		createdAt = date;
		this.favourite = favourite;
		tags = new ArrayList<>();
	}
	
	public String getName() {
		return name;
	}
	public String getUrl() {
		return url;
	}
	public List<TagPayload> getTags() {
		return this.tags;
	}
	public void setTags(List<TagPayload> tags) {
		this.tags = tags;
	}
	public void addTag(TagPayload tag) {
		tags.add(tag);
	}
	public Date getCreatedAt() {
		return this.createdAt;
	}
	public boolean isFavourite() {
		return favourite;
	}
	public void setFavourite(boolean favourite) {
		this.favourite = favourite;
	}
	@Override
	public int compareTo(BookmarkPayload b) {
		return this.getCreatedAt().compareTo(b.getCreatedAt());
	}
}
