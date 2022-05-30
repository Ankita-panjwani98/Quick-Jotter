import React, { useEffect, useState } from "react";
import "./index.css";
const options = [
  {
    id: 1,
    actionName: "Delete",
    iconClassName: "fa fa-trash-o",
  },
  {
    id: 2,
    actionName: "Copy",
    iconClassName: "fa fa-copy",
  },
  {
    id: 3,
    actionName: "Edit",
    iconClassName: "fa fa-pencil-square-o",
    Fun: "()=>handleEditItem(item.id)",
  },
];

function DisplayNotesList({
  item,
  onDelete,
  onCopy,
  addPinnedData,
  pinned,
  filterPinnedData,
  pinnedNotesData
}) {
  const [selectItemId, seSelectedItemId] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const formatDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    let todayDate = date.getDate();
    let month = date.toLocaleString("default", { month: "long" });
    // let monthSpell = month.toLocaleString('default', { month: 'long' });
    let year = date.getFullYear();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime =
      hours +
      ":" +
      minutes +
      " " +
      ampm +
      " " +
      todayDate +
      " " +
      month +
      " " +
      year;
    return strTime;
  };
  // const finalDate = formatDate(new Date());
  // const time = hours + minutes + seconds;
  // console.log("New Date", finalDate);

  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(formatDate(new Date()));
  }, []);

  const handleDropdown = (itemSelected) => {
    // alert("in dropdown");
    setDropdown(!dropdown);
    seSelectedItemId(itemSelected);
  };

  const handleEditItem = (id) => {
    console.log("Id to be edited: ", id);
  };

  const handleAllActions = (aItem) => {
    console.log("Id to be performed operations: ", aItem);
    if (aItem.actionName === "Delete") {
      onDelete(selectItemId);
      setDropdown(true);
    } else if (aItem.actionName === "Copy") {
      onCopy(selectItemId);
      setDropdown(true);
    } else {
      handleEditItem(selectItemId);
      setDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    setDropdown(false);
  };

  const handlePinnedClick = (item) => {
    filterPinnedData(item.id);
    addPinnedData(item);
  };

  console.log("pinned boolean value: OUTSIDE ", pinned);

  console.log("ID clicked", selectItemId);
  return (
    <div className="note-description-box" onMouseLeave={handleMouseLeave}>
      <div className="note-description">
        {/* <form>
          <input type="text" placeholder="Title" autoComplete="off" />
          <textarea
            name="w3review"
            placeholder="Write a note..."
            rows=""
            cols=""
          />
        </form> */}
        <div className="note-title">
          <div> {item.title} </div>
          
          <div className={pinned} onClick={() => handlePinnedClick(item)}>
            {/* <i
              className="fa fa-thumb-tack pin-icon-before"
              aria-hidden="true"
            ></i>  */}

            <i className={pinnedNotesData!==null ? 'fa fa-thumb-tack pin-icon-after' : 'fa fa-thumb-tack pin-icon-before'} ></i>
          </div>
        </div>
        <hr className="hr-line-style"/>
        {/* <div className="note-title">{id}</div> */}
        <div className="display-description">{item.content}</div>
      </div>
      <div className="note-actions">
        <div className="note-time">{date}</div>
        <span
          className="note-actions-left"
          onMouseEnter={() => handleDropdown(item)}
        >
          <i className="fa fa-ellipsis-v"></i>
        </span>
        {dropdown ? (
          <>
            <div className="dropdown-container">
              {options.map((item) => {
                return (
                  <div key={item.id} className="dropdown-item">
                    <span>{item.actionName}</span>
                    <span>
                      <i
                        className={item.iconClassName}
                        onClick={() => handleAllActions(item)}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default DisplayNotesList;
