package com.nemo.broilerbackend.dto;

import com.nemo.broilerbackend.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private UUID userId;
    private String userPrincipleName;
    private String displayName;
    private String email;
    private String givenName;
    private String surname;

    public UserDTO(User user) {
        this.userId = user.getId();
        this.userPrincipleName = user.getUserPrincipleName();
        this.displayName = user.getDisplayName();
        this.email = user.getEmail();
        this.givenName = user.getGivenName();
        this.surname = user.getSurname();
    }
}
