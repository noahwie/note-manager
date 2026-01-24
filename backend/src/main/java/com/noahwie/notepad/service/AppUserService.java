package com.noahwie.notepad.service;

import com.noahwie.notepad.model.AppUser;
import com.noahwie.notepad.model.Role;
import com.noahwie.notepad.repository.AppUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class AppUserService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUserService(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AppUser registerUser(String username, String email, String rawPassword, Role role) {
        if (appUserRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username" + username + "is already in use");
        }

        if (appUserRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email" + email + "is already in use");
        }

        String hashedPassword = passwordEncoder.encode(rawPassword);

        AppUser newUser = new AppUser(username, email, hashedPassword, role);

        return appUserRepository.save(newUser);
    }

    public Optional<AppUser> findByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    public Optional<AppUser> findByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }

    public Optional<AppUser> authenticateUser (String username, String rawPassword) {
        Optional<AppUser> userOpt = findByUsername(username);
        if(userOpt.isPresent()) {
            AppUser user = userOpt.get();
            if(passwordEncoder.matches(rawPassword, user.getPassword())) {
                return userOpt;
            }
        }
        return Optional.empty();
    }

    public void updatePassword (long id, String password) {
        AppUser user = appUserRepository.findById(id)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        user.setPassword(passwordEncoder.encode(password));

        appUserRepository.save(user);
    }

    public void updatePasswordUser (AppUser user, String password) {


        user.setPassword(passwordEncoder.encode(password));

        appUserRepository.save(user);
    }

    private boolean isValidEmail(String email) {
        return email != null && email.contains("@") && email.length() > 3;
    }
}
