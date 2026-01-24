package com.noahwie.notepad.controller;

import com.noahwie.notepad.model.AppUser;
import com.noahwie.notepad.repository.AppUserRepository;
import com.noahwie.notepad.service.AppUserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Todo: PreAuthorize

@RestController
public class UserController {
    private final AppUserService appUserService;
    public UserController(final AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/user")
    public AppUser getUser(@AuthenticationPrincipal AppUser appUser) {
        return appUserService.findByUsername(appUser.getUsername()).get();
    }
}
