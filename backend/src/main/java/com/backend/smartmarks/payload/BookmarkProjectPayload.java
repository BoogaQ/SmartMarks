package com.backend.smartmarks.payload;

public class BookmarkProjectPayload {
	
	private String bookmark;
	
	private String projectName;
	
	public BookmarkProjectPayload() {};
	public BookmarkProjectPayload(String bookmark, String projectName) {
		this.bookmark = bookmark;
		this.projectName = projectName;
	}
	public String getBookmark() {
		return this.bookmark;
	}
	public void setBookmark(String bookmark) {
		this.bookmark = bookmark;
	}
	public String getProjectName() {
		return this.projectName;
	}
	public void setTagName(String tagName) {
		this.projectName = tagName;
	}
}
