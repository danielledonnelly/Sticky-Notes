import React from "react";
import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";
import { db } from "../appwrite/database";

const Color = ({ color }) => {
    const { selectedNote, notes, setNotes } = useContext(NotesContext);

    const changeColor = () => {
        console.log("Selected color:", selectedNote);

        try {
            const currentNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            );

            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: JSON.stringify(color),
            };

            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);

            db.notes.update(selectedNote.$id, {
                colors: JSON.stringify(color),
            });
        } catch (error) {
            alert("Please select a note before changing colors.");
        }
    };

    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default Color;
