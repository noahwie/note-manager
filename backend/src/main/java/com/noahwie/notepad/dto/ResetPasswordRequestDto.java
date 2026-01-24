package com.noahwie.notepad.dto;

public class ResetPasswordRequestDto {
    @jakarta.validation.constraints.NotBlank
    @jakarta.validation.constraints.Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
