package com.example;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173",
  methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE },
  maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface PersonRepository extends CrudRepository<Person, Long> {
  List<Person> findByFirstName(String firstName);
}
