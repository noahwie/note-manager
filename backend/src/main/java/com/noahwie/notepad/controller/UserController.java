package com.noahwie.notepad.controller;

import com.noahwie.notepad.dto.ResetPasswordRequestDto;
import com.noahwie.notepad.model.AppUser;
import com.noahwie.notepad.repository.AppUserRepository;
import com.noahwie.notepad.service.AppUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

// Todo: PreAuthorize

@RestController
@RequestMapping("/user")
public class UserController {
    private final AppUserService appUserService;
    public UserController(final AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("")
    public AppUser getUser(@AuthenticationPrincipal AppUser appUser) {
        return appUserService.findByUsername(appUser.getUsername()).get();
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PutMapping("/password")

    public ResponseEntity<?> updatePassword(@AuthenticationPrincipal AppUser user, @RequestBody ResetPasswordRequestDto request) {
        appUserService.updatePasswordUser(user ,request.getPassword());

        return ResponseEntity.noContent().build();
    }
}
