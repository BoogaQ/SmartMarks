package com.backend.smartmarks.payload;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;

import com.backend.smartmarks.model.Tag;

public class BookmarkPayload implements Comparable<BookmarkPayload>{
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String url;
	
	@NotBlank
	private Date createdAt;
	
	private List<TagPayload> tags;
	
	public BookmarkPayload(String name, String url, Date date) {
		this.name = name;
		this.url = url;
		createdAt = date;
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
	@Override
	public int compareTo(BookmarkPayload b) {
		return this.getCreatedAt().compareTo(b.getCreatedAt());
	}
}
