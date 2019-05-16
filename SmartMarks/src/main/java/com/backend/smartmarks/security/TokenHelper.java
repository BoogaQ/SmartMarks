package com.backend.smartmarks.security;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.*;

@Component
@PropertySource(value = {"classpath:application.properties"})
public class TokenHelper {
	
	private static final Logger logger = LoggerFactory.getLogger(TokenHelper.class);
	
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
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }
}
