package com.noahwie.notepad.controller;

import com.noahwie.notepad.dto.LoginRequestDto;
import com.noahwie.notepad.dto.LoginResponseDto;
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
import java.util.Optional;

@RestController
@RequestMapping("/auth")
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

        } catch (IllegalArgumentException e) {
            Map<String, String> errors = new HashMap<>();
            errors.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errors);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "sign up failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto request) {
        try {
            // 1. User finden (Username oder Email)
            Optional<AppUser> userOpt;

            // Prüfen ob Email oder Username
            if (request.getUsernameOrEmail().contains("@")) {
                // Hat @? -> Email
                userOpt = appUserService.findByEmail(request.getUsernameOrEmail());
            } else {
                // kein @? -> Username
                userOpt = appUserService.findByUsername(request.getUsernameOrEmail());
            }

            // User existiert nicht
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Ungültige Anmeldedaten"));
            }

            AppUser user = userOpt.get();

            // 2. Passwort prüfen mit authenticateUser
            Optional<AppUser> authenticatedUser =
                    appUserService.authenticateUser(user.getUsername(), request.getPassword());

            if (authenticatedUser.isEmpty()) {
                // passwort falsch
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Ungültige Anmeldedaten"));
            }

            // 3. JWT Token generieren
            String token = jwtService.generateToken(
                    user.getUsername(),
                    user.getRole().name()
            );

            // 4. Response DTO erstellen
            LoginResponseDto response = new LoginResponseDto(
                    token,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole().name(),
                    86400000L
            );

            // 5. Success Response
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // unerwartete Fehler
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Ein Fehler ist aufgetret" + e.getMessage()));
        }
    }
}
