package com.backend.smartmarks.payload;

public class BookmarkTagPayload {
	
	private String bookmark;
	
	private String tagName;
	
	public BookmarkTagPayload() {};
	public BookmarkTagPayload(String bookmark, String tagName) {
		this.bookmark = bookmark;
		this.tagName = tagName;
	}
	public String getBookmark() {
		return this.bookmark;
	}
	public void setBookmark(String bookmark) {
		this.bookmark = bookmark;
	}
	public String getTagName() {
		return this.tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
}
