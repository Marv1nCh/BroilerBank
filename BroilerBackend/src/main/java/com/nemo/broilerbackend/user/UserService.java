package com.nemo.broilerbackend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> addUser(User user) {
        if (user.getId() == null) {
            return Optional.of(userRepository.save(user));
        }
        return Optional.empty();
    }
}
