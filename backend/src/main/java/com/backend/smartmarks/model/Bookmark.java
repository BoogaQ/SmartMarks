package com.backend.smartmarks.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
/*
@Entity
@Table(name="bookmarks")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value= {"createdAt", "updatedAt"},
allowGetters=true)
public class Bookmark {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@NotBlank
	private String name;
	
	@
	
}
*/