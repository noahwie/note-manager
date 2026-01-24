package com.noahwie.notepad.service;

import com.noahwie.notepad.dto.FolderDto;
import com.noahwie.notepad.mapper.FolderMapper;
import com.noahwie.notepad.model.AppUser;
import com.noahwie.notepad.model.Folder;
import com.noahwie.notepad.repository.FolderRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
/**
 * Service class responsible for folder-related business logic.
 * Handles retrieval, creation and deletion of folders.
 */
@Service
public class FolderService {
    private final FolderRepository folderRepository;
    private final FolderMapper folderMapper;

    public FolderService(FolderRepository folderRepository, FolderMapper folderMapper) {
        this.folderRepository = folderRepository;
        this.folderMapper = folderMapper;
    }

    /**
     * Retrieves all folders from the database and maps them to DTOs.
     * @return list of all folders as FolderDto
     */
    public List<FolderDto> getAllFolders() {
        return folderRepository.findAll()
                .stream()
                .map(folderMapper::toDto)
                .toList();
    }

    /**
     * Retrieves a specific folder by ID.
     * @param id folder ID
     * @return the folder as FolderDto
     * @throws RuntimeException if folder not found
     */
    public FolderDto getFolderById(long id) {
        return folderRepository.findById((long) id)
                .map(folderMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Folder not found"));
    }

    /**
     * Creates a new folder from the given FolderDto.
     * @param folderDto DTO containing name
     * @return the saved FolderDto
     */
    public FolderDto createFolder(FolderDto folderDto) {
        Folder folder = folderMapper.toEntity(folderDto);
        folder.setCreatedAt(LocalDateTime.now());
        Folder savedFolder = folderRepository.save(folder);
        return folderMapper.toDto(savedFolder);
    }

    /**
     * Deletes a folder by ID, including all its notes.
     * @param id folder ID to delete
     * @throws ResponseStatusException if folder not found
     */
    public void deleteFolderById(long id) {
        if (!folderRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Folder not found");
        }
        folderRepository.deleteById(id);
    }
}
