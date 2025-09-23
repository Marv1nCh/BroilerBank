package com.nemo.broilerbackend.user;

import com.nemo.broilerbackend.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*") //TODO delete
@RestController
@RequestMapping(path = "/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers().stream().map(UserDTO::new).toList();
    }

    @PostMapping
    public Optional<User> createUser(@RequestBody User user) {
        return userService.addUser(user);
    }
}
