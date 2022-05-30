import React, { useEffect, useState } from "react";
import AddNote from "../AddNote";
import DisplayNotesList from "../DisplayNotesList";
import EmptyNote from "../EmptyNote";
import "react-tabs/style/react-tabs.css";
import "./index.css";

function Notes({
  options,
  useSnackbar,
  tabSelected,
  setTabSelected,
  statusGreen,
  setStatusGreen,
  filteredResults,
  setFilteredResults,
  setSearchInput,
  searchInput,
  pinnedNotesData,
  setPinnedNotesData,
  notes,
  setNotes,
  trash,
  setTrash,
}) {
  // const [tabSelected, setTabSelected] = useState("All");
  const [openSnackbar] = useSnackbar(options);
  const [pinned, setPinned] = useState("pinned-default");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("pinnedNotes", JSON.stringify(pinnedNotesData));
    localStorage.setItem("searchFilterNotes", JSON.stringify(filteredResults));
    localStorage.setItem("trashData", JSON.stringify(trash));
  }, [notes, pinnedNotesData, filteredResults, trash]);

  const addNote = (addedNote) => {
    if (notes.includes(addedNote)) {
      openSnackbar("Note Already Exists", 2000);
    } else {
      if (filteredResults.length > 0) {
        setStatusGreen("new-note-update-status");
        setNotes((prevData) => {
          return [addedNote, ...prevData];
        });
      } else {
        setNotes((prevData) => {
          return [addedNote, ...prevData];
        });
      }
    }
  };

  const handlePinnedData = (pinnItem) => {
    console.log("PINNED item parent: ", pinnItem);
    if (pinnedNotesData.includes(pinnItem)) {
      handlePinnedDelete(pinnItem.id);
      addNote(pinnItem);
    } else {
      if (filteredResults.length > 0) {
        setStatusGreen("new-note-update-status");
        setPinnedNotesData((prevData) => {
          return [pinnItem, ...prevData];
        });
      } else {
        setPinnedNotesData((prevData) => {
          return [pinnItem, ...prevData];
        });
      }
    }
  };

  const filterPinnedData = (id) => {
    console.log("Id to be FILTERED in PINNED PARENT APP: ", id);
    let newFilteredNotes = [...notes];
    newFilteredNotes = newFilteredNotes.filter((item) => item.id !== id);
    console.log("Filtered Items", newFilteredNotes);
    setNotes(newFilteredNotes);
    openSnackbar("Note Pinned Sucessfully", 2000);
  };
  const handleDelete = (deleteItem) => {
    console.log("Id to be deleted in PARENT APP: ", deleteItem.id);
    let newNotes = [...notes];
    let newPinnedData = [...pinnedNotesData];
    let newTrashNotes = [...trash];

    console.log("ITEM PRESENT OR NOT:", newNotes.includes(deleteItem));
    // console.log("INDEX PRESENT: ", indexStatus);
    if (newNotes.includes(deleteItem)) {
      console.log("INSIDE NOTES DELETE");
      newNotes = newNotes.filter((item) => item.id !== deleteItem.id);
      console.log("AFTER FILTER Items", newNotes);
      setNotes(newNotes);
      openSnackbar("Note Deleted Sucessfully", 2000);
    } else if (newTrashNotes.includes(deleteItem)) {
      console.log("INSIDE TRASH DELETE");
      newTrashNotes = trash.filter((item) => item.id !== deleteItem.id);
      console.log("AFTER FILTER Items", trash);
      setTrash(newTrashNotes);
      openSnackbar("Note Deleted Permanently", 2000);
    } else {
      newPinnedData = newPinnedData.filter((item) => item.id !== deleteItem.id);
      console.log("AFTER FILTER Items", newPinnedData);
      setPinnedNotesData(newPinnedData);
      openSnackbar("Note Deleted Sucessfully", 2000);
    }
  };

  const handlePinnedDelete = (id) => {
    console.log("Id to be deleted in PARENT APP: ", id);
    let newPinnedNotes = [...pinnedNotesData];
    newPinnedNotes = newPinnedNotes.filter((item) => item.id !== id);
    console.log("Filter pinned Items", newPinnedNotes);
    setPinnedNotesData(newPinnedNotes);
    openSnackbar("Unpinned Sucessfully", 2000);
  };
  const handleInputChange = (event) => {
    const searchValue = event.target.value;
    console.log("Search Input", searchValue);
    setSearchInput(searchValue);
  };

  const handleSearchInputSubmit = (event) => {
    event.preventDefault();
    let combinedData = [...notes, ...pinnedNotesData];
    if (searchInput.length === 0) {
      openSnackbar("Search Field can't be empty!", 2000);
    } else {
      let filteredData = combinedData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      if (filteredData.length === 0) {
        openSnackbar("0 results found!", 2000);
      } else {
        setFilteredResults(filteredData);
      }
    }
  };
  const handleCopyItem = (citem) => {
    console.log("Item to be COPIED:", citem);
    const ids = notes.map((object) => {
      return object.id;
    });
    const max = Math.max(...ids);
    setNotes((prevData) => {
      return [
        {
          id: max + 1,
          title: citem.title,
          content: citem.content,
        },
        ...prevData,
      ];
    });
  };

  console.log("TOTAL NOTES LENGTH in PARENT APP", notes.length);
  console.log("TOTAL NOTES in PARENT APP", notes);

  // console.log("PINNED NOTES in PARENT APP", pinnedNotesData);

  return (
    <div>
      {/* ==================== START MENU BAR ========================= */}
      <div className="menu-bar">
        <div className="logo-title-container">
          <div className="logo-container">
            <img src="./Image/book1.png" alt="logo" className="logo" />
          </div>
          <div className="app-title">Quick Jotter</div>
        </div>
        <form className="search-bar">
          <input
            type="text"
            placeholder="Search a note..."
            className="search-input"
            value={searchInput}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="search-btn"
            onClick={handleSearchInputSubmit}
          >
            <i className="fa fa-search search-icon"></i>
          </button>
        </form>
      </div>
      {/* ====================  END MENU BAR =========================== */}

      <AddNote
        passNote={addNote}
        notes={notes}
        options={options}
        useSnackbar={useSnackbar}
      />
      {/* <div >All</div> */}
      <div className="tabs-panel">
        {/* {filteredResults.length > 0 ||
        notes.length > 0 ||
        pinnedNotesData.length > 0 ? (
          <div className="tabs-list">
            <div
              className={tabSelected === "All" ? "tabs-active" : "tabs-default"}
              onClick={resetNotesData}
            >
              All
             
            </div>
           
          </div>
        ) : (
          ""
        )} */}
        {pinnedNotesData.length > 0 &&
        filteredResults.length === 0 &&
        (tabSelected === "All" || tabSelected === "show-pinned") ? (
          <div className="pinned-heading">PINNED</div>
        ) : (
          ""
        )}

        <div className="notes-list-container">
          {pinnedNotesData.length > 0 &&
          filteredResults.length === 0 &&
          (tabSelected === "All" || tabSelected === "show-pinned") ? (
            pinnedNotesData.map((item, index) => {
              return (
                <DisplayNotesList
                  key={index}
                  onDelete={handleDelete}
                  onCopy={handleCopyItem}
                  item={item}
                  pinned={pinned}
                  filterPinnedData={filterPinnedData}
                  handlePinnedData={handlePinnedData}
                  addPinnedData={handlePinnedData}
                  pinnedNotesData={pinnedNotesData}
                />
              );
            })
          ) : tabSelected === "show-pinned" ? (
            <EmptyNote />
          ) : (
            ""
          )}
        </div>

        {/* {filteredResults.length > 0 || notes.length > 0 ? (
          <div className="pinned-heading">OTHERS</div>
        ) : (
          ""
        )} */}

        {filteredResults.length > 0 && (
          <div className="pinned-heading">SEARCHED RESULTS</div>
        )}
        {pinnedNotesData.length > 0 &&
        filteredResults.length === 0 &&
        tabSelected === "All" ? (
          <div className="pinned-heading">OTHERS</div>
        ) : (
          ""
        )}

        {tabSelected === "All" ? (
          <div className="notes-list-container">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, index) => {
                return (
                  <DisplayNotesList
                    key={index}
                    onDelete={handleDelete}
                    item={item}
                    pinned={pinned}
                    onCopy={handleCopyItem}
                    filterPinnedData={filterPinnedData}
                    handlePinnedData={handlePinnedData}
                    addPinnedData={handlePinnedData}
                    pinnedNotesData={pinnedNotesData}
                  />
                );
              })
            ) : notes.length > 0 ||
              ((notes.length > 0 || pinnedNotesData.length > 0) &&
                filteredResults.length === 0) ? (
              notes.map((item, index) => {
                return (
                  <DisplayNotesList
                    key={index}
                    onDelete={handleDelete}
                    onCopy={handleCopyItem}
                    item={item}
                    pinned={pinned}
                    filterPinnedData={filterPinnedData}
                    handlePinnedData={handlePinnedData}
                    addPinnedData={handlePinnedData}
                    pinnedNotesData={pinnedNotesData}
                  />
                );
              })
            ) : (
              <EmptyNote />
            )}
          </div>
        ) : tabSelected === "show-trash" ? (
          <>
            <div className="notes-list-container">
              {trash.length > 0
                ? trash.map((item, index) => {
                    return (
                      <DisplayNotesList
                        key={index}
                        onDelete={handleDelete}
                        onCopy={handleCopyItem}
                        item={item}
                        pinned={pinned}
                        filterPinnedData={filterPinnedData}
                        handlePinnedData={handlePinnedData}
                        addPinnedData={handlePinnedData}
                        pinnedNotesData={pinnedNotesData}
                      />
                    );
                  })
                : <div className="empty-trash-message">NO TRASH GATHERED</div>}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Notes;
