package com.noahwie.notepad.mapper;

import com.noahwie.notepad.dto.NoteDto;
import com.noahwie.notepad.model.Note;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * MapStruct mapper interface for converting between Note entities and NoteDto objects.
 * Simplifies transformation between database models and REST API data structures.
 */
@Mapper(componentModel = "spring")
public interface NoteMapper {
    NoteMapper INSTANCE = Mappers.getMapper(NoteMapper.class);

    /**
     * Converts a Note entity into a NoteDto.
     * @param note the Note entity
     * @return corresponding NoteDto
     */
    NoteDto toDto(Note note);

    /**
     * Converts a NoteDto into a Note entity.
     * @param dto the NoteDto
     * @return corresponding Note entity
     */
    Note toEntity(NoteDto dto);
}