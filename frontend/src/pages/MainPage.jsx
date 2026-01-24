// src/pages/MainPage.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NoteCard from "../components/NoteCard";
import PopupNote from "../components/PopupNote";
import PopupReadNote from "../components/PopupReadNote";
import { getNotesInFolder } from "../services/api";

function MainPage() {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    if (selectedFolder) {
      fetchNotes(selectedFolder.id);
    } else {
      setNotes([]);
    }
  }, [selectedFolder]);

  const fetchNotes = async (folderId) => {
    try {
      const response = await getNotesInFolder(folderId);
      setNotes(response.data);
    } catch (error) {
      console.error("Fehler beim Laden der Notizen:", error);
    }
  };

  const handleNoteCreate = () => {
    setShowPopup(false);
    fetchNotes(selectedFolder.id);
  };

  return (
    <div className="main-layout">
      <Sidebar
        onFolderSelect={setSelectedFolder}
        selectedFolder={selectedFolder}
        onFolderDeleted={(deletedId) => {
          if (selectedFolder?.id === deletedId) {
            setSelectedFolder(null);
          }
        }}
      />

      <div className={`main-content ${showPopup || selectedNote ? "blurred" : ""}`}>
        <div className="header">
          {selectedFolder && (
            <button onClick={() => setShowPopup(true)} className="new-note-btn" style={{ width: "200px" }}>
              New Note +
            </button>
          )}
        </div>

        <div className="note-grid">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onClick={ ()=> setSelectedNote(note)} />
          ))}
        </div>
      </div>

      {showPopup && selectedFolder && (
        <PopupNote
          folderId={selectedFolder.id}
          onClose={() => setShowPopup(false)}
          onCreate={handleNoteCreate}
        />
      )}

      {selectedNote && (
        <PopupReadNote
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={() => {
            setSelectedNote(null);
            fetchNotes(selectedFolder.id);
          }}
        />
      )}
    </div>
  );
}

export default MainPage;
