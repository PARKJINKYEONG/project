package com.ict.traveljoy.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InputUser {
    private String email, password;

    public InputUser(String username) {
        this.email = username;
    }
}
