package com.noahwie.notepad.mapper;

import com.noahwie.notepad.dto.FolderDto;
import com.noahwie.notepad.model.Folder;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * MapStruct mapper interface for converting between Folder entities and FolderDto objects.
 * Used to separate internal entity structure from external data transfer structure.
 */
@Mapper(componentModel = "spring", uses = NoteMapper.class)
public interface FolderMapper {
    FolderMapper INSTANCE = Mappers.getMapper(FolderMapper.class);
    /**
     * Converts a Folder entity into a FolderDto.
     * @param folder the Folder entity
     * @return corresponding FolderDto
     */
    FolderDto toDto(Folder folder);

    /**
     * Converts a FolderDto into a Folder entity.
     * @param dto the FolderDto
     * @return corresponding Folder entity
     */
    Folder toEntity(FolderDto dto);
}
