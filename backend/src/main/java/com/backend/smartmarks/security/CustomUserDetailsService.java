package com.backend.smartmarks.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.smartmarks.model.User;
import com.backend.smartmarks.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	UserRepository userRepository;
	
	// Loads user from a repository using his username or email, and creates a UserPrincipal object to hold this data
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String nameOrEmail) throws UsernameNotFoundException {
		
		User user = userRepository.findByUsernameOrEmail(nameOrEmail, nameOrEmail)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + nameOrEmail));
		
		return UserPrincipal.create(user);
	}
	
	@Transactional
	public UserDetails loadByUserId(Long id) throws UsernameNotFoundException {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));

		return UserPrincipal.create(user);
	}
	
}
