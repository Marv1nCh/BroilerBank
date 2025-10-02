package com.nemo.broilerbackend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nemo.broilerbackend.dto.UserDTO;
import com.nemo.broilerbackend.user.User;
import com.nemo.broilerbackend.user.UserController;
import com.nemo.broilerbackend.user.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(controllers = UserController.class)
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserService userService;
    @Autowired
    private ObjectMapper objectMapper;

    private UserDTO userDTO1;
    private UserDTO userDTO2;

    @TestConfiguration
    static class UserControllerTestsConfiguration {
        @Bean
        public UserService userService() {
            return Mockito.mock(UserService.class);
        }
    }
    @BeforeEach
    public void setUp() {
        User user1 = buildUser("TestUser1");
        User user2 = buildUser("TestUser2");
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
    public void UserController_CreateUser_ReturnsNotNull() throws Exception {
        given(userService.addOrUpdateUser(ArgumentMatchers.any()))
                .willAnswer(invocation -> invocation.getArgument(0));

        ResultActions response = mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO1)));

        response.andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    public void UserController_CreateUser_returnsNotNUllUserDTO() throws Exception {
        given(userService.addOrUpdateUser(ArgumentMatchers.any()))
            .willAnswer(invocation -> invocation.getArgument(0));

        ResultActions response = mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO1)));

        String json = response.andReturn().getResponse().getContentAsString();
        UserDTO respsonseUserDto = objectMapper.readValue(json, UserDTO.class);

        Assertions.assertNotNull(respsonseUserDto);
    }

    @Test
    public void UserController_CreateUser_returnsCorrectUserDTO() throws Exception {
        given(userService.addOrUpdateUser(ArgumentMatchers.any()))
                .willAnswer(invocation -> invocation.getArgument(0));

        ResultActions response = mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO1)));

        String json = response.andReturn().getResponse().getContentAsString();
        UserDTO respsonseUserDto = objectMapper.readValue(json, UserDTO.class);

        Assertions.assertEquals(userDTO1.getGivenName(), respsonseUserDto.getGivenName());
        Assertions.assertEquals(userDTO1.getSurname(), respsonseUserDto.getSurname());
    }

    @Test
    public void UserController_GetAllUsers_ReturnsNotNull() throws Exception {
        given(userService.getAllUsers())
                .willReturn(Arrays.asList(userDTO1, userDTO2));

        ResultActions response = mockMvc.perform(get("/users")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void UserController_GetAllUsers_ReturnsNotNullUserDto() throws Exception {
        given(userService.getAllUsers())
                .willReturn(Arrays.asList(userDTO1, userDTO2));

        ResultActions response = mockMvc.perform(get("/users")
                .contentType(MediaType.APPLICATION_JSON));

        String json = response.andReturn().getResponse().getContentAsString();
        List<UserDTO> responseUserDto = objectMapper.readValue(json, new TypeReference<>() {});

        Assertions.assertNotNull(responseUserDto);
    }

    @Test
    public void UserController_GetAllUsers_ReturnsCorrectNumberOfUserDto() throws Exception {
        given(userService.getAllUsers())
                .willReturn(Arrays.asList(userDTO1, userDTO2));

        ResultActions response = mockMvc.perform(get("/users")
                .contentType(MediaType.APPLICATION_JSON));

        String json = response.andReturn().getResponse().getContentAsString();
        List<UserDTO> responseUserDto = objectMapper.readValue(json, new TypeReference<>() {});

        Assertions.assertEquals(2, responseUserDto.size());
    }
}
