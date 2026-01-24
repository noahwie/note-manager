package com.noahwie.notepad.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
/**
 * Data Transfer Object (DTO) representing a folder and its associated notes.
 * Used to transfer data between backend and frontend without exposing entity internals.
 */
@Getter
@Setter
public class FolderDto {
    /** ID of the folder (matches database primary key). */
    private Long id;

    /** Name of the folder; must not be blank. */
    @NotBlank(message = "Folder name must not be empty")
    private String name;

    /** Creation timestamp of the folder. */
    private LocalDateTime createdAt;

    /** List of notes inside this folder. */
    private List<NoteDto> notes;

    private String creatorUsername;

    private Long creatorId;
}
