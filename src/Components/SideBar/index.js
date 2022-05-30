import React from "react";
import Notes from "../Notes";
import "./index.css";

function SideBar({
  showAllNotes,
  showPinneditems,
  notes,
  pinnedNotesData,
  deleteAllNotes,
  showTrash,
  statusGreen,
  setStatusGreen,
}) {
  const handleNotesClicked = () => {
    showAllNotes();
  };
  const handlePinnedItemsClicked = () => {
    showPinneditems();
  };
  const deleteAllNotesClicked = () => {
    deleteAllNotes();
  };
  const showTrashClicked = () => {
    showTrash();
  };
  return (
    <div>
      <div className="notebook-design"></div>
      <div className="notebook-design"></div>
      <div
        className="notebook-design side-tab-notes"
        onClick={handleNotesClicked}
      >
        NOTES <span className={statusGreen}></span>
      </div>
      <div
        className="notebook-design side-tab-pinned"
        onClick={handlePinnedItemsClicked}
      >
        PINNED
      </div>
      <div
        className="notebook-design side-tab-delete-all"
        onClick={
          pinnedNotesData.length > 0 || notes.length > 0
            ? deleteAllNotesClicked
            : undefined
        }
      >
        {" "}
        {pinnedNotesData.length === 0 && notes.length === 0
          ? "ALL DELETED"
          : "DELETE ALL"}
      </div>
      <div
        className="notebook-design side-tab-trash"
        onClick={showTrashClicked}
      >
        TRASH
      </div>
      <div className="notebook-design"></div>
      <div className="notebook-design"></div>
      <div className="notebook-design"></div>
      <div className="notebook-design"></div>
      <div className="notebook-design"></div>
      <div className="notebook-design"></div>
      <div className="notebook-design"></div>
    </div>
  );
}

export default SideBar;
