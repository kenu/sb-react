package com.example;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface PersonRepository extends CrudRepository<Person, Long> {
  List<Person> findByFirstName(String firstName);
}
