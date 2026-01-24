package com.noahwie.notepad.dto;

import com.noahwie.notepad.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDto {
    @NotBlank(message = "Username ist erforderlich")
    @Size(min = 3, max = 50, message = "Username muss 3-50 zeichen sein")
    private String username;

    @NotBlank(message = "Email ist erforderlich")
    @Email(message = "Email muss gültig sein")
    private String email;

    @NotBlank(message = "Passwort erforderlich")
    @Size (min = 6, message = "passwort muss mindestens 6 Zeichen haben")
    private String password;

    private Role role;

    // Default constructor or JSON Deserialization
    public RegisterRequestDto() {}

    public RegisterRequestDto(String username, String email,
                              String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        return "RegisterRequestDTO{" +
                "username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='[HIDDEN]'" +
                '}';
    }
}
