package com.backend.smartmarks.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.smartmarks.model.Bookmark;
import com.backend.smartmarks.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
	public Optional<Project> findByNameAndUserId(String name, Long id);
	public Optional<Project> findByNameIgnoreCase(String name);
	
	public boolean existsByName(String name);
}
