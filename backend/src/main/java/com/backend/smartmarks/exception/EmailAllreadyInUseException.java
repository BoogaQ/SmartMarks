package com.backend.smartmarks.exception;

public class EmailAllreadyInUseException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Object user;
	
	public EmailAllreadyInUseException(Object email) {
		this.user = email;
	}
	
	public Object getEmail() {
		return user;
	}

}
