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
        <div>
          <i className="fa fa-sticky-note" aria-hidden="true"></i>
        </div>
        <div className="notes-status-tab">
          {" "}
          NOTES <span className={statusGreen}></span>
        </div>
      </div>
      <div
        className="notebook-design side-tab-pinned"
        onClick={handlePinnedItemsClicked}
      >
        <div>
          {" "}
          <i className="fa fa-thumb-tack"></i>
        </div>
        <div>PINNED</div>
      </div>
    
      <div
        className="notebook-design side-tab-trash"
        onClick={showTrashClicked}
      >
        <div>
          {" "}
          <i class='fas fa-trash-alt'></i>

        </div>
        <div> TRASH</div>
      </div>
      {/* <div
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
          : "EMPTY NOTES"}
      </div> */}
      <div className="notebook-design"></div>
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
