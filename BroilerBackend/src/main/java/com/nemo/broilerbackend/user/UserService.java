package com.nemo.broilerbackend.user;

import com.nemo.broilerbackend.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

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

    public UserDTO addUser(UserDTO userDTO) {
        //TODO remove hardcoded values when ready
        User user = User.builder()
                .userPrincipleName(userDTO.getUserPrincipleName())
                .displayName(userDTO.getDisplayName())
                .email(userDTO.getEmail())
                .givenName(userDTO.getGivenName())
                .surname(userDTO.getSurname())
                .accountEnabled(false)
                .userType("Admin")
                .roles(Collections.emptyList())
                .updatedAt(LocalDate.now())
                .build();

        return new UserDTO(userRepository.save(user));
    }
}
