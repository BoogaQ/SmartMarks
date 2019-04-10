package com.backend.smartmarks.payload;

public class TagPayload {
	
	private String tagName;
	
	public TagPayload(String tagName) {
		this.tagName = tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	public String getTagName() {
		return this.tagName;
	}
}
