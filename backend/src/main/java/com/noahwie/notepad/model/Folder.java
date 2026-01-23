package com.noahwie.notepad.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
/**
 * Entity representing a folder that groups related notes.
 * A folder contains a name, creation timestamp, and a list of notes.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Folder {
    /** Unique identifier of the folder (primary key). */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Name of the folder defined by the user. */
    private String name;

    /** Timestamp when the folder was created. */
    private LocalDateTime createdAt = LocalDateTime.now();

    public Folder(Long id, String name, LocalDateTime createdAt, List<Note> notes) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.notes = notes;
    }

    /** List of notes that belong to this folder. */
    @OneToMany(mappedBy = "folder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id")
    private AppUser createdBy;
}
