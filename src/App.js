import "./App.css";
import Notes from "./Components/Notes";
import SideBar from "./Components/SideBar";
import SnackbarProvider from "react-simple-snackbar";
import { useSnackbar } from "react-simple-snackbar";
import { useEffect, useState } from "react";

const options = {
  position: "top-center",
  style: {
    backgroundColor: "#11308a",
    // border: "2px solid rgb(241, 94, 65)",
    color: "white",
    fontSize: "15px",
    textAlign: "center",
    // width: '200px'
  },
  closeStyle: {
    color: "white",
    fontSize: "15px",
  },
};

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  const [pinnedNotesData, setPinnedNotesData] = useState(
    JSON.parse(localStorage.getItem("pinnedNotes")) || []
  );
  const [tabSelected, setTabSelected] = useState("All");
  const [filteredResults, setFilteredResults] = useState(
    JSON.parse(localStorage.getItem("searchFilterNotes")) || []
  );
  const [trash, setTrash] = useState(
    JSON.parse(localStorage.getItem("trashData")) || []
  );
  const [searchInput, setSearchInput] = useState("");
  const [statusGreen, setStatusGreen] = useState(
    "new-note-update-status-default"
  );

  useEffect(() => {
    localStorage.setItem("trashData", JSON.stringify(trash));
  }, [trash]);


  const showAllNotes = () => {
    console.log("SHOW ALL");

    setTabSelected("All");
    setFilteredResults([]);
    setSearchInput("");
    if (statusGreen === "new-note-update-status") {
      setStatusGreen("new-note-update-status-after-read");
    } else {
      return;
    }
  };

  const showPinneditems = () => {
    setTabSelected("show-pinned");
    console.log("SHOW PINNED");
  };
  const deleteAllNotes = () => {
    console.log("DELETE ALL");
    setTabSelected("delete-all");
    let trashData = [...notes, ...pinnedNotesData];
    setTrash(trashData);
    setNotes([]);
    setPinnedNotesData([]);
  };
  const showTrash = () => {
    console.log("SHOW TRASH");

    setTabSelected("show-trash");
  };

  
  return (
    <div className="App">
      <div className="sidebar-container">
        <SideBar
          showAllNotes={showAllNotes}
          showPinneditems={showPinneditems}
          deleteAllNotes={deleteAllNotes}
          showTrash={showTrash}
          statusGreen={statusGreen}
          setStatusGreen={setStatusGreen}
          pinnedNotesData={pinnedNotesData}
          notes={notes}
        />
      </div>
      <div className="notes-container">
        <SnackbarProvider>
          <Notes
            options={options}
            tabSelected={tabSelected}
            setTabSelected={setTabSelected}
            useSnackbar={useSnackbar}
            statusGreen={statusGreen}
            setStatusGreen={setStatusGreen}
            showAllNotes={showAllNotes}
            filteredResults={filteredResults}
            setFilteredResults={setFilteredResults}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            pinnedNotesData={pinnedNotesData}
            setPinnedNotesData={setPinnedNotesData}
            notes={notes}
            setNotes={setNotes}
            trash={trash}
            setTrash={setTrash}
          />
        </SnackbarProvider>
      </div>
    </div>
  );
}

export default App;
