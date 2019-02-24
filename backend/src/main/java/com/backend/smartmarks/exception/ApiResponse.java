package com.backend.smartmarks.exception;

public class ApiResponse {
	private boolean success;
	private String message;
	private Object error;
	
	public ApiResponse(boolean success, String message) {
		this.success = success;
		this.message = message;	
	}
	
	public ApiResponse(boolean success, String message, Object error) {
		this.success = success;
		this.message = message;
		this.error = error;			
	}
	
	public boolean getSuccess() {
		return success;
	}	
	public String getMessage() {
		return message;
	}	
	public Object getError() {
		return error;
	}
}
