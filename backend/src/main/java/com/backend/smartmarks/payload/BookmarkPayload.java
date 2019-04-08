package com.backend.smartmarks.payload;

import javax.validation.constraints.NotBlank;

public class BookmarkPayload {
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String url;
	
	public BookmarkPayload(String name, String url) {
		this.name = name;
		this.url = url;
	}
	
	public String getName() {
		return name;
	}
	public String getUrl() {
		return url;
	}
}
