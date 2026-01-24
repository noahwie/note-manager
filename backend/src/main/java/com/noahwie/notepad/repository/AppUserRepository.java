package com.noahwie.notepad.repository;

import com.noahwie.notepad.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
    Optional<AppUser> findByEmail(String email);

    // For Login Validation
    Optional<AppUser> findByEmailAndPassword(String email, String password);

    // Checks if Username already exists
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
