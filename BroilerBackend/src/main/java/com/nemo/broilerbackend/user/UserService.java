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

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserDTO::new).toList();
    }

    public UserDTO addOrUpdateUser(UserDTO userDTO) {
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

        if(userDTO.getUserId() != null) {
            User foundUser = userRepository.findById(userDTO.getUserId()).get();
            user.setId(foundUser.getId());
            user.setCreatedAt(foundUser.getCreatedAt());
            user.setUpdatedAt(LocalDate.now());
        }

        return new UserDTO(userRepository.save(user));
    }
}
