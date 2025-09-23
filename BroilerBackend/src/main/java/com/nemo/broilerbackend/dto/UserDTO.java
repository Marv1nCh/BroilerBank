package com.nemo.broilerbackend.dto;

import com.nemo.broilerbackend.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String userPrincipleName;
    private String displayName;
    private String email;
    private String givenName;
    private String surname;

    public UserDTO(User user) {
        this.userPrincipleName = user.getUserPrincipleName();
        this.displayName = user.getDisplayName();
        this.email = user.getEmail();
        this.givenName = user.getGivenName();
        this.surname = user.getSurname();
    }
}
