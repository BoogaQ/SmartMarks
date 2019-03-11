package com.backend.smartmarks.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
@PropertySource(value = {"classpath:application.properties"})
public class TokenHelper {
	
	@Value("${jwt.secret}")
    private String SECRET;

    @Value("${jwt.expires_in}")
    private int EXPIRES_IN;
    
    public String generateToken(Authentication authentication) {
    	UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    	
    	return Jwts.builder()
    			.setSubject(Long.toString(userPrincipal.getId()))
    			.setIssuedAt(new Date(System.currentTimeMillis()))
    			.setExpiration(new Date(System.currentTimeMillis() + EXPIRES_IN))
    			.signWith(SignatureAlgorithm.HS512, SECRET)
    			.compact();					
    }
    public Long getIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }
    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
        	System.out.println(e.getMessage());	
        }
        return false;
    }
}
