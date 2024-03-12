package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Component
public class SpringDataRestCustomization implements RepositoryRestConfigurer {
  @Value("${client.address}")
  String clientAddress;

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
    System.out.println(clientAddress);

    cors.addMapping("/persons/**")
        .allowedOrigins(clientAddress)
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        .allowCredentials(false).maxAge(3600);
  }
}
