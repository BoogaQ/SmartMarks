package com.backend.smartmarks.exception;

public class EmailAllreadyInUseException extends RuntimeException {

	EmailAllreadyInUseException(String message) {
		super(message);
	}
	EmailAllreadyInUseException(String message, Throwable cause) {
		super(message, cause);
	}}
