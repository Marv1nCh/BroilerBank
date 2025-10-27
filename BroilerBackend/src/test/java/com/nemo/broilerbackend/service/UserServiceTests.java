package com.nemo.broilerbackend.service;

import com.nemo.broilerbackend.dto.UserDTO;
import com.nemo.broilerbackend.user.User;
import com.nemo.broilerbackend.user.UserRepository;
import com.nemo.broilerbackend.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
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
    public void addingAUserReturnsACorrectUserDto() {
        when(userRepository.save(Mockito.any(User.class))).thenReturn(user1);

        UserDTO savedUserDTO = userService.addOrUpdateUser(userDTO1);

        assertEquals(userDTO1.getGivenName(), savedUserDTO.getGivenName());
        assertEquals(userDTO1.getSurname(), savedUserDTO.getSurname());
    }

    @Test
    public void tryingToAddAnExistingUserReturnsThatUser() {
        UserDTO userDTOForTest = new UserDTO(user1);
        User userForTest = buildUser("TestUser1");
        userForTest.setId(userForTest.getId());
        userDTOForTest.setUserId(UUID.randomUUID());

        when(userRepository.findById((UUID) Mockito.any())).thenReturn(Optional.of(userForTest));
        when(userRepository.save(Mockito.any(User.class))).thenReturn(userForTest);

        UserDTO savedUserDTO = userService.addOrUpdateUser(userDTOForTest);

        assertEquals(userDTO1.getGivenName(), savedUserDTO.getGivenName());
        assertEquals(userDTO1.getSurname(), savedUserDTO.getSurname());
    }

    @Test
    public void gettingAllUsersReturnsAListOfAllUsers() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        List<UserDTO> userDTOs = userService.getAllUsers();

        assertEquals(2, userDTOs.size());
        assertTrue(userDTOs.stream().map(UserDTO::getGivenName).toList().contains(userDTO1.getGivenName()));
        assertTrue(userDTOs.stream().map(UserDTO::getSurname).toList().contains(userDTO1.getSurname()));
        assertTrue(userDTOs.stream().map(UserDTO::getGivenName).toList().contains(userDTO2.getGivenName()));
        assertTrue(userDTOs.stream().map(UserDTO::getSurname).toList().contains(userDTO2.getSurname()));
    }
}
