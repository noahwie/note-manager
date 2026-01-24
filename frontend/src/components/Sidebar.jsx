// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { getFolders, deleteFolder } from "../services/api";
import FolderItem from "./FolderItem";
import PopupFolder from "./PopupFolder";

function Sidebar({ onFolderSelect, selectedFolder, onFolderDeleted }) {
  const [folders, setFolders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const response = await getFolders();
      setFolders(response.data);
    } catch (error) {
      console.error("Fehler beim Laden der Folder:", error);
    }
  };

  const handleFolderClick = (folder) => {
    onFolderSelect(folder);
  };

  const handleDeleteFolder = async (folder) => {
    const confirmed = window.confirm(`Möchtest du den Ordner "${folder.name}" wirklich löschen?`);
    if (!confirmed) return;

    try {
      await deleteFolder(folder.id);
      fetchFolders();

      // Falls gerade selektierter Folder gelöscht wurde
      if (onFolderDeleted && selectedFolder?.id === folder.id) {
        onFolderDeleted(folder.id);
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Folders:", error);
    }
  };

  const handleCreateSuccess = () => {
    setShowPopup(false);
    fetchFolders();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-button">
        <button onClick={() => setShowPopup(true)} className="new-folder-btn">
          New Folder +
        </button>
      </div>
      <div className="sidebar-folders">
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            folder={folder}
            onClick={() => handleFolderClick(folder)}
            onDelete={handleDeleteFolder}
          />
        ))}
  
        {showPopup && (
          <PopupFolder
            onClose={() => setShowPopup(false)}
            onCreate={handleCreateSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default Sidebar;
