package com.backend.smartmarks.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.smartmarks.model.Bookmark;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
	
	public Optional<Bookmark> findByUrl(String url);
}
