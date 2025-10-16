package com.nemo.broilerbackend.importDB.transformers;

import com.nemo.broilerbackend.user.User;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Collections;

public class UserTransformer {

    public static LocalDate parseToLocalDate(String date) {
        OffsetDateTime offsetDateTime = OffsetDateTime.parse(date.replace(" ", "T"));
        return offsetDateTime.toLocalDate();
    }

    public static User parseToUser(String fileLine) {
        String[] file = fileLine.split(",");
        String givenName = file[1].trim();
        String surname = file[2].trim();
        LocalDate createdAt = UserTransformer.parseToLocalDate(file[3].trim());

        return User.builder()
                .userPrincipleName(givenName)
                .displayName(givenName)
                .email(givenName + "." + surname + "@yatta.de")
                .givenName(givenName)
                .surname(surname)
                .accountEnabled(false)
                .userType("")
                .roles(Collections.emptyList())
                .createdAt(createdAt)
                .build();
    }

    public static User parsePurchaseToUser(String fileLine) {
        String[] file = fileLine.split(",");
        String givenName = file[1].trim();
        String surname = file[2].trim();
        LocalDate createdAt = LocalDate.parse(file[3].trim());

        return User.builder()
                .userPrincipleName(givenName)
                .displayName(givenName)
                .email(givenName + "." + surname + "@yatta.de")
                .givenName(givenName)
                .surname(surname)
                .accountEnabled(false)
                .userType("")
                .roles(Collections.emptyList())
                .createdAt(createdAt)
                .build();
    }
}
