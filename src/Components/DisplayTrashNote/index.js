import React from "react";
import "./index.css";

function DisplayTrashNote({ item }) {
  return (
    <div className="note-description-box">
      <div className="note-description">
        <div className="note-title">
          <div> {item.title} </div>
        </div>
        <hr className="hr-line-style" />

        <div className="display-description">{item.content}</div>
      </div>
      <div className="note-actions">
       <div className="delete-forever-item"><img src="./Image/delete_forever.png"  className="delete-forever-logo" alt="logo" /></div>
       <div className="restore-item-logo"><i class='fas fa-trash-restore-alt'></i></div>
      </div>
    </div>
  );
}

export default DisplayTrashNote;
