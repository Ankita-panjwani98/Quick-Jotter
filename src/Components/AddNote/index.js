import React, { useState } from "react";

import "./index.css";

function AddNote({ passNote, notes, options, useSnackbar }) {
  const [note, setNote] = useState({
    id: notes.length,
    title: "",
    content: "",
  });
  const [openSnackbar] = useSnackbar(options);

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    // console.log("note added", key, value);
    setNote((prevData) => {
      return {
        ...prevData,
        [key]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    const ids = notes.map((object) => {
      return object.id;
    });
    const max = Math.max(...ids);

    event.preventDefault();
    if (note.title.length === 0 && note.content.length === 0) {
      openSnackbar("Title and Description is required!!", 2000);
    } else if (note.title.length != 0 && note.content.length === 0) {
      openSnackbar(" Description is required!!", 2000);
    } else if (note.title.length === 0 && note.content.length != 0) {
      openSnackbar(" Title is required!!", 2000);
    } else {
      if (max === notes.length) {
        passNote({ ...note, id: max + 1 });
      } else {
        if (notes.length > 0) {
          passNote({ ...note, id: max + 1 });
        } else {
          passNote({ ...note, id: notes.length });
        }
      }
    }
    setNote({
      id: max,
      title: "",
      content: "",
    });
  };
  // console.log("id of 5th eleemnt ", typeof(NotesList[5].id));
  return (
    <div className="note-container">
      <form className="note-create-container">
        <input
          type="text"
          placeholder="Title"
          autoComplete="off"
          onChange={handleChange}
          name="title"
          value={note.title}
          maxLength="50"
          className="note-input"
          required
        />

        <textarea
          className="note-textarea"
          placeholder="Write a note..."
          onChange={handleChange}
          value={note.content}
          name="content"
          rows=""
          cols=""
          required
        />
        <button className="add_note_btn" onClick={handleSubmit}>
          <i className="fa fa-plus add-icon" />
        </button>
      </form>
    </div>
  );
}

export default AddNote;
