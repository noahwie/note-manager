package com.noahwie.notepad.service;

import com.noahwie.notepad.model.AppUser;
import com.noahwie.notepad.model.Role;
import com.noahwie.notepad.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class AppUserServiceTest {

    @Mock
    private AppUserRepository appUserRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AppUserService appUserService;

    @BeforeEach
    void setUp() {
        // @InjectMocks already wires mocks into service
    }

    @Test
    void registerUser_success_encodesPasswordAndSaves() {
        String username = "noah";
        String email = "noah@example.com";
        String rawPassword = "secret";
        String hashed = "hashed-secret";
        Role role = Role.USER; // adjust if your enum differs

        when(appUserRepository.existsByUsername(username)).thenReturn(false);
        when(appUserRepository.existsByEmail(email)).thenReturn(false);
        when(passwordEncoder.encode(rawPassword)).thenReturn(hashed);

        // Return the passed entity (common repo stub)
        when(appUserRepository.save(any(AppUser.class)))
                .thenAnswer(invocation -> invocation.getArgument(0, AppUser.class));

        AppUser saved = appUserService.registerUser(username, email, rawPassword, role);

        assertNotNull(saved);
        assertEquals(username, saved.getUsername());
        assertEquals(email, saved.getEmail());
        assertEquals(hashed, saved.getPassword());

        verify(appUserRepository).existsByUsername(username);
        verify(appUserRepository).existsByEmail(email);
        verify(passwordEncoder).encode(rawPassword);

        ArgumentCaptor<AppUser> captor = ArgumentCaptor.forClass(AppUser.class);
        verify(appUserRepository).save(captor.capture());
        AppUser toSave = captor.getValue();
        assertEquals(username, toSave.getUsername());
        assertEquals(email, toSave.getEmail());
        assertEquals(hashed, toSave.getPassword());
        assertEquals(role, toSave.getRole());
    }

    @Test
    void registerUser_throwsWhenUsernameAlreadyExists() {
        String username = "noah";
        String email = "noah@example.com";

        when(appUserRepository.existsByUsername(username)).thenReturn(true);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> appUserService.registerUser(username, email, "pw", Role.USER)
        );

        assertTrue(ex.getMessage().contains("Username"));
        verify(appUserRepository).existsByUsername(username);
        verify(appUserRepository, never()).existsByEmail(anyString());
        verify(passwordEncoder, never()).encode(anyString());
        verify(appUserRepository, never()).save(any());
    }

    @Test
    void registerUser_throwsWhenEmailAlreadyExists() {
        String username = "noah";
        String email = "noah@example.com";

        when(appUserRepository.existsByUsername(username)).thenReturn(false);
        when(appUserRepository.existsByEmail(email)).thenReturn(true);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> appUserService.registerUser(username, email, "pw", Role.USER)
        );

        assertTrue(ex.getMessage().contains("Email"));
        verify(appUserRepository).existsByUsername(username);
        verify(appUserRepository).existsByEmail(email);
        verify(passwordEncoder, never()).encode(anyString());
        verify(appUserRepository, never()).save(any());
    }

    @Test
    void findByEmail_delegatesToRepository() {
        String email = "a@b.com";
        AppUser user = mock(AppUser.class);
        when(appUserRepository.findByEmail(email)).thenReturn(Optional.of(user));

        Optional<AppUser> result = appUserService.findByEmail(email);

        assertTrue(result.isPresent());
        assertSame(user, result.get());
        verify(appUserRepository).findByEmail(email);
    }

    @Test
    void findByUsername_delegatesToRepository() {
        String username = "noah";
        AppUser user = mock(AppUser.class);
        when(appUserRepository.findByUsername(username)).thenReturn(Optional.of(user));

        Optional<AppUser> result = appUserService.findByUsername(username);

        assertTrue(result.isPresent());
        assertSame(user, result.get());
        verify(appUserRepository).findByUsername(username);
    }

    @Test
    void authenticateUser_success_returnsUserWhenPasswordMatches() {
        String username = "noah";
        String rawPassword = "secret";

        AppUser user = mock(AppUser.class);
        when(user.getPassword()).thenReturn("hashed");
        when(appUserRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(rawPassword, "hashed")).thenReturn(true);

        Optional<AppUser> result = appUserService.authenticateUser(username, rawPassword);

        assertTrue(result.isPresent());
        assertSame(user, result.get());
        verify(appUserRepository).findByUsername(username);
        verify(passwordEncoder).matches(rawPassword, "hashed");
    }

    @Test
    void authenticateUser_wrongPassword_returnsEmpty() {
        String username = "noah";
        String rawPassword = "wrong";

        AppUser user = mock(AppUser.class);
        when(user.getPassword()).thenReturn("hashed");
        when(appUserRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(rawPassword, "hashed")).thenReturn(false);

        Optional<AppUser> result = appUserService.authenticateUser(username, rawPassword);

        assertTrue(result.isEmpty());
        verify(appUserRepository).findByUsername(username);
        verify(passwordEncoder).matches(rawPassword, "hashed");
    }

    @Test
    void authenticateUser_userNotFound_returnsEmptyAndDoesNotCheckPassword() {
        when(appUserRepository.findByUsername("missing")).thenReturn(Optional.empty());

        Optional<AppUser> result = appUserService.authenticateUser("missing", "pw");

        assertTrue(result.isEmpty());
        verify(appUserRepository).findByUsername("missing");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    void updatePassword_success_encodesAndSaves() {
        long id = 42L;
        String newRaw = "newPw";
        String encoded = "encodedNewPw";

        AppUser user = mock(AppUser.class);
        when(appUserRepository.findById(id)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(newRaw)).thenReturn(encoded);

        appUserService.updatePassword(id, newRaw);

        verify(appUserRepository).findById(id);
        verify(passwordEncoder).encode(newRaw);
        verify(user).setPassword(encoded);
        verify(appUserRepository).save(user);
    }

    @Test
    void updatePassword_userNotFound_throwsResponseStatusException404() {
        long id = 404L;
        when(appUserRepository.findById(id)).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () -> appUserService.updatePassword(id, "pw")
        );

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertTrue(ex.getReason().contains("User not found"));

        verify(appUserRepository).findById(id);
        verify(passwordEncoder, never()).encode(anyString());
        verify(appUserRepository, never()).save(any());
    }

    @Test
    void updatePasswordUser_success_encodesAndSaves() {
        String newRaw = "newPw";
        String encoded = "encodedNewPw";
        AppUser user = mock(AppUser.class);

        when(passwordEncoder.encode(newRaw)).thenReturn(encoded);

        appUserService.updatePasswordUser(user, newRaw);

        verify(passwordEncoder).encode(newRaw);
        verify(user).setPassword(encoded);
        verify(appUserRepository).save(user);
    }
}
