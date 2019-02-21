package com.backend.smartmarks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SmartmarksApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartmarksApplication.class, args);
	}

}
