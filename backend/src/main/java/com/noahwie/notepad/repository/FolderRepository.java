package com.noahwie.notepad.repository;

import com.noahwie.notepad.model.AppUser;
import com.noahwie.notepad.model.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> findByCreatedBy(AppUser user);
}
