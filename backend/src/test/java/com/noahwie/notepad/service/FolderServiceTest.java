package com.noahwie.notepad.service;

import com.noahwie.notepad.dto.FolderDto;
import com.noahwie.notepad.mapper.FolderMapper;
import com.noahwie.notepad.model.Folder;
import com.noahwie.notepad.repository.FolderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FolderServiceTest {

    private FolderRepository folderRepository;
    private FolderMapper folderMapper;
    private FolderService folderService;

    @BeforeEach
    void setUp() {
        folderRepository = mock(FolderRepository.class);
        folderMapper = mock(FolderMapper.class);
        folderService = new FolderService(folderRepository, folderMapper);
    }

//    @Test
//    void getAllFolders_returnsMappedList() {
//        Folder folder = new Folder();
//        FolderDto folderDto = new FolderDto();
//        when(folderRepository.findAll()).thenReturn(List.of(folder));
//        when(folderMapper.toDto(folder)).thenReturn(folderDto);
//
//        List<FolderDto> result = folderService.getAllFoldersCr();
//
//        assertEquals(1, result.size());
//        verify(folderRepository).findAll();
//        verify(folderMapper).toDto(folder);
//    }

    @Test
    void getFolderById_existingId_returnsDto() {
        Folder folder = new Folder();
        folder.setId(1L);
        FolderDto dto = new FolderDto();
        dto.setId(1L);

        when(folderRepository.findById(1L)).thenReturn(Optional.of(folder));
        when(folderMapper.toDto(folder)).thenReturn(dto);

        FolderDto result = folderService.getFolderById(1L);

        assertEquals(1L, result.getId());
        verify(folderRepository).findById(1L);
        verify(folderMapper).toDto(folder);
    }

//    @Test
//    void createFolder_savesAndReturnsDto() {
//        FolderDto inputDto = new FolderDto();
//        inputDto.setName("New Folder");
//
//        Folder folderEntity = new Folder();
//        folderEntity.setName("New Folder");
//
//        Folder savedEntity = new Folder();
//        savedEntity.setId(5L);
//        savedEntity.setName("New Folder");
//        savedEntity.setCreatedAt(LocalDateTime.now());
//
//        FolderDto outputDto = new FolderDto();
//        outputDto.setId(5L);
//        outputDto.setName("New Folder");
//
//        when(folderMapper.toEntity(inputDto)).thenReturn(folderEntity);
//        when(folderRepository.save(ArgumentMatchers.any(Folder.class))).thenReturn(savedEntity);
//        when(folderMapper.toDto(savedEntity)).thenReturn(outputDto);
//
//        FolderDto result = folderService.createFolder(inputDto);
//
//        assertEquals("New Folder", result.getName());
//        verify(folderRepository).save(folderEntity);
//        verify(folderMapper).toEntity(inputDto);
//        verify(folderMapper).toDto(savedEntity);
//    }

    @Test
    void deleteFolderById_existingId_deletes() {
        when(folderRepository.existsById(1L)).thenReturn(true);

        folderService.deleteFolderById(1L);

        verify(folderRepository).existsById(1L);
        verify(folderRepository).deleteById(1L);
    }

    @Test
    void deleteFolderById_notExisting_throwsException() {
        when(folderRepository.existsById(99L)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> folderService.deleteFolderById(99L));

        verify(folderRepository).existsById(99L);
        verify(folderRepository, never()).deleteById(any());
    }
}
