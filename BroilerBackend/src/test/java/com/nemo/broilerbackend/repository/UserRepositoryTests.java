package com.nemo.broilerbackend.repository;

import com.nemo.broilerbackend.user.User;
import com.nemo.broilerbackend.user.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Collections;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class UserRepositoryTests {
    @Autowired
    private UserRepository userRepository;

    private User user1;
    private User user2;

    @BeforeEach
    public void setUp() {
        user1 = buildUser("TestUser1");
        user2 = buildUser("TestUser2");
    }

    private static User buildUser(String name) {
        return User.builder()
                .givenName(name + "FirstName")
                .surname(name + "Surname")
                .displayName(name + "DisplayName")
                .email(name + "@TestEmail.de")
                .userType("TestUserType")
                .userPrincipleName(name + "PrincipleName")
                .accountEnabled(true)
                .userType("Admin")
                .roles(Collections.emptyList())
                .build();
    }

    @Test
    public void UserRepository_Save_ReturnNotNUll() {
        User savedUser = userRepository.save(user1);

        Assertions.assertNotNull(savedUser);
    }

    @Test
    public void UserRepository_Save_ReturnCorrectUser() {
        User savedUser = userRepository.save(user1);

        Assertions.assertEquals(savedUser.getGivenName(), user1.getGivenName());
        Assertions.assertEquals(savedUser.getSurname(), user1.getSurname());
    }

    @Test
    public void UserRepository_FindAll_ReturnNotNull() {
        userRepository.save(user1);
        userRepository.save(user2);

        List<User> users = userRepository.findAll();

        Assertions.assertNotNull(users);
    }


    @Test
    public void UserRepository_FindAll_ReturnCorrectNumberOfUsers() {
        userRepository.save(user1);
        userRepository.save(user2);

        List<User> users = userRepository.findAll();

        Assertions.assertEquals(2, users.size());
    }

    @Test
    public void UserRepository_FindByGivenNameAndSurname_ReturnNotnull() {
        userRepository.save(user1);

        User savedUser = userRepository.findByGivenNameAndSurname(user1.getGivenName(), user1.getSurname()).get();

        Assertions.assertNotNull(savedUser);
    }

    @Test
    public void UserRepository_FindByGivenNameAndSurname_ReturnCorrectUser() {
        User savedUser = userRepository.save(user1);

        User foundUser = userRepository.findByGivenNameAndSurname(user1.getGivenName(), user1.getSurname()).get();

        Assertions.assertEquals(savedUser.getId(), foundUser.getId());
    }

}
