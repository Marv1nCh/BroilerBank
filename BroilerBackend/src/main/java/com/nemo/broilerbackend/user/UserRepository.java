package com.nemo.broilerbackend.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByGivenNameAndSurname(String givenName, String surname);

    boolean existsByGivenNameAndSurname(String givenName, String surname);

    Optional<User> findById(UUID id);
}
