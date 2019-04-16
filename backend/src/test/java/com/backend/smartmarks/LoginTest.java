package com.backend.smartmarks;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.backend.smartmarks.controller.AuthenticationController;
import com.backend.smartmarks.controller.UserController;
import com.backend.smartmarks.payload.LoginRequest;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class LoginTest {
	
	@Autowired
    AuthenticationManager authenticationManager;

	@Test
	public void testLogin() {
		
		
		AuthenticationController uc = new AuthenticationController();
		
		LoginRequest login1 = new LoginRequest("k.tijunaitis1@gmail.com", "863855936");
		LoginRequest login2 = new LoginRequest("k.tijunaitis1@gmail.com", "asdasd");
		
		ResponseEntity<?> success = uc.login(login1);
		ResponseEntity<?> failure = uc.login(login2);
		
		
		Assert.assertEquals(200, success.getStatusCodeValue());
	}	
}
