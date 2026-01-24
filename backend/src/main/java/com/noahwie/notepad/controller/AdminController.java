package com.noahwie.notepad.controller;

import com.noahwie.notepad.dto.ResetPasswordRequestDto;
import com.noahwie.notepad.model.AppUser;
import com.noahwie.notepad.repository.AppUserRepository;
import com.noahwie.notepad.service.AppUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AppUserRepository appUserRepository;
    private final AppUserService appUserService;

    public AdminController(AppUserRepository appUserRepository, AppUserService appUserService) {
        this.appUserRepository = appUserRepository;
        this.appUserService = appUserService;
    }

    @GetMapping("/users")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public List<AppUser> getUsers() {
        return appUserRepository.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/users/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable long id, @RequestBody ResetPasswordRequestDto request) {
        appUserService.updatePassword(id, request.getPassword());

        return ResponseEntity.noContent().build();
    }
}
