package com.noahwie.notepad.dto;

import lombok.Getter;

@Getter
public class RegisterResponseDto {
    private final Long id;
    private final String username;
    private final String email;
    private final String role;
    private final String message;

    public RegisterResponseDto(Long id, String username, String email, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.message = "Registration erfolgreich!";
    }

    @Override
    public String toString() {
        return "RegisterResponseDTO{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
