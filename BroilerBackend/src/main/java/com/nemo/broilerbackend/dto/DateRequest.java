package com.nemo.broilerbackend.dto;

import lombok.Setter;

import java.time.Instant;
import java.util.Date;

@Setter
public class DateRequest {

    private Instant date;

    public Date getDate() {
        return Date.from(date);
    }

}
