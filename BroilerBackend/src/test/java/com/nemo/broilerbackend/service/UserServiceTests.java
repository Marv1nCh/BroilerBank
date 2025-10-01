package com.nemo.broilerbackend.service;

import com.nemo.broilerbackend.dto.UserDTO;
import com.nemo.broilerbackend.user.User;
import com.nemo.broilerbackend.user.UserRepository;
import com.nemo.broilerbackend.user.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user1;
    private User user2;
    private UserDTO userDTO1;
    private UserDTO userDTO2;

    @BeforeEach
    public void setUp() {
        user1 = buildUser("TestUser1");
        user2 = buildUser("TestUser2");
        userDTO1 = new UserDTO(user1);
        userDTO2 = new UserDTO(user2);

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
    public void UserService_addUser_ReturnNotNull() {
        when(userRepository.save(Mockito.any(User.class))).thenReturn(user1);

        UserDTO savedUserDTO = userService.addUser(userDTO1);

        Assertions.assertNotNull(savedUserDTO);
    }

    @Test
    public void UserService_addUser_ReturnCorrectUserDTO() {
        when(userRepository.save(Mockito.any(User.class))).thenReturn(user1);

        UserDTO savedUserDTO = userService.addUser(userDTO1);

        Assertions.assertEquals(userDTO1.getGivenName(), savedUserDTO.getGivenName());
        Assertions.assertEquals(userDTO1.getSurname(), savedUserDTO.getSurname());
    }

    @Test
    public void UserService_getAllUsers_ReturnNotNull() {
        when(userRepository.findAll()).thenReturn(Collections.singletonList(user1));

        List<UserDTO> userDTOs = userService.getAllUsers();

        Assertions.assertNotNull(userDTOs);
    }

    @Test
    public void UserService_getAllUsers_ReturnCorrectNumberOfUsers() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        List<UserDTO> userDTOs = userService.getAllUsers();

        Assertions.assertEquals(2, userDTOs.size());
    }

    @Test
    public void UserService_getAllUsers_ReturnCorrectUserDTOs() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        List<UserDTO> userDTOs = userService.getAllUsers();

        Assertions.assertTrue(userDTOs.stream().map(UserDTO::getGivenName).toList().contains(userDTO1.getGivenName()));
        Assertions.assertTrue(userDTOs.stream().map(UserDTO::getSurname).toList().contains(userDTO1.getSurname()));
        Assertions.assertTrue(userDTOs.stream().map(UserDTO::getGivenName).toList().contains(userDTO2.getGivenName()));
        Assertions.assertTrue(userDTOs.stream().map(UserDTO::getSurname).toList().contains(userDTO2.getSurname()));
    }
}
