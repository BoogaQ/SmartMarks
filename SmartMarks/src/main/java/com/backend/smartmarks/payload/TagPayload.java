package com.backend.smartmarks.payload;

public class TagPayload implements Comparable<TagPayload>{
	
	private String tagName;
	
	private Long id;
	
	private int count;
	
	public TagPayload(String tagName) {
		this.tagName = tagName;
	}
	
	public TagPayload(String tagName, Long id, int count) {
		this.tagName = tagName;
		this.id = id;
		this.count = count;
	}
	
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	public String getTagName() {
		return this.tagName;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getCount() {
		return count;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getId() {
		return id;
	}
	@Override
	public int compareTo(TagPayload t) {
		if (t.getCount() - this.getCount() == 0) {
			return this.getTagName().compareToIgnoreCase(t.getTagName());
		}
		return t.getCount() - this.getCount();
	}
	
}
