// src/components/PopupFolder.jsx
import React, { useState } from "react";
import { createFolder } from "../services/api";

function PopupFolder({ onClose, onCreate }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await createFolder({ name ,  }); // POST an /folders
      onCreate(); // löst Aktualisierung in Sidebar aus
    } catch (error) {
      console.error("Fehler beim Erstellen des Folders:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Add Folder Name</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Folder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="popup-buttons">
            <button type="submit" className="create-btn">Create Folder</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupFolder;