package com.backend.smartmarks.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.smartmarks.model.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
	public Optional<Tag> findByTagName(String tagName);
	public Optional<Tag> findByTagNameIgnoreCase(String tagName);
}
