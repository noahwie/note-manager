package com.noahwie.notepad.controller;

import com.noahwie.notepad.dto.RegisterRequestDto;
import com.noahwie.notepad.dto.RegisterResponseDto;
import com.noahwie.notepad.model.AppUser;
import com.noahwie.notepad.repository.AppUserRepository;
import com.noahwie.notepad.service.AppUserService;
import com.noahwie.notepad.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final AppUserService appUserService;
    private final JwtService jwtService;
    public AuthController(AppUserService appUserService, JwtService jwtService) {
        this.appUserService = appUserService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDto request) {
        try {
            AppUser newUser = appUserService.registerUser(
                    request.getUsername(),
                    request.getEmail(),
                    request.getPassword(),
                    request.getRole()
            );

            RegisterResponseDto response = new RegisterResponseDto(
                    newUser.getId(),
                    newUser.getUsername(),
                    newUser.getEmail(),
                    newUser.getRole().name()
            );
            return ResponseEntity.ok(response);

        } catch (IllegalStateException e) {
            Map<String, String> errors = new HashMap<>();
            errors.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errors);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "sign up failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // TODO: Login endpoints
}
