package com.nemo.broilerbackend.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByFirstNameAndName(String firstName, String lastName);
}
