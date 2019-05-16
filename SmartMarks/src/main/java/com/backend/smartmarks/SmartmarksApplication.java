package com.backend.smartmarks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaAuditing
@EntityScan(basePackageClasses = { 
		SmartmarksApplication.class
		})
@EnableJpaRepositories
public class SmartmarksApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartmarksApplication.class, args);
	}

}
