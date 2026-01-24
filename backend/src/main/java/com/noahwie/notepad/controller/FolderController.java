package com.noahwie.notepad.controller;

import com.noahwie.notepad.dto.FolderDto;
import com.noahwie.notepad.model.AppUser;
import com.noahwie.notepad.service.FolderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * REST controller for managing folders.
 * Provides endpoints for listing, creating, retrieving, and deleting folders.
 */
@RestController
@RequestMapping("/folders")
public class FolderController {

private final FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    /**
     * GET /folders
     * Returns a list of all folders.
     * @return list of FolderDto
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public List<FolderDto> getAllFolders() {
        return folderService.getAllFolders();
    }

    /**
     * GET /folders/{id}
     * Returns a single folder by its ID.
     * @param id the folder ID
     * @return FolderDto
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public FolderDto getFolderById(@PathVariable long id) {
        return folderService.getFolderById(id);
    }

    /**
     * POST /folders
     * Creates a new folder based on the given data.
     * @param folderDto folder input (name)
     * @return the created folder
     */
    @PostMapping
    public FolderDto createFolder(@RequestBody @Valid FolderDto folderDto) {
        return folderService.createFolder(folderDto);
    }

    /**
     * DELETE /folders/{id}
     * Deletes a folder by ID, including all contained notes.
     * @param id ID of the folder to delete
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFolderById(@PathVariable long id) {
       folderService.deleteFolderById(id);
    }
}
