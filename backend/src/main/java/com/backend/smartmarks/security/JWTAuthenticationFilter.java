package com.backend.smartmarks.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.filter.OncePerRequestFilter;


public class JWTAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private TokenHelper tokenHelper;
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	private String getToken(HttpServletRequest req) {
		String authHeader = req.getHeader("Authorization");
		if (authHeader != null && authHeader.startsWith("Bearer")) {
			return authHeader.substring(7);
		}
		return null;
	}
	// Chekcs weather JWT token is authentic and loads user details to set authentication in spring
	@Override
	protected void doFilterInternal(HttpServletRequest req,
									HttpServletResponse res,
									FilterChain filterChain) throws IOException, ServletException {		
		try {
			String jwt = getToken(req);			
			if (jwt != null && tokenHelper.validateToken(jwt)) {
				Long id = tokenHelper.getIdFromToken(jwt);
				// Optional, can parse details from jwts claims
				UserDetails userDetails = customUserDetailsService.loadByUserId(id);
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, 
																											null,
																											userDetails.getAuthorities());     
	            SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		filterChain.doFilter(req, res);
	}
}
