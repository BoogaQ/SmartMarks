package com.backend.smartmarks.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);
    @Override
    public void commence(HttpServletRequest req,
                         HttpServletResponse res,
                         AuthenticationException e) throws IOException, ServletException, UsernameNotFoundException {
        logger.error("Responding with unauthorized error. Message - {}", e.getMessage());
        res.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
    }
}