import { useEffect, useState } from "react";

export function EmailFolderList({ onSetFilterBy, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilterBy(filterByToEdit);
  }, [filterByToEdit]);

  // useEffect(() => {
  //   setFilterByToEdit(filterBy)
  // }, [filterBy])

  function handleSelection(selection) {
    if (selection === "unread") {
      setFilterByToEdit({isRead: true });
    } else {
      setFilterByToEdit({
        status: selection,
        isRead: false,
      });
    }
  }

  return (
    <section className="email-folder-list">
      <ul className="folder-items">
        <li
          className={`folder-item ${
            filterByToEdit.status === "inbox" && !filterByToEdit.isRead
              ? "active-filter"
              : ""
          }`}
          onClick={() => handleSelection("inbox")}
        >
          Inbox
        </li>
        <li
          className={`folder-item ${
            filterByToEdit.status === "starred" && !filterByToEdit.isRead
              ? "active-filter"
              : ""
          }`}
          onClick={() => handleSelection("starred")}
        >
          Starred
        </li>
        <li
          className={`folder-item ${
            filterByToEdit.isRead ? "active-filter" : ""
          }`}
          onClick={() => handleSelection("unread")}
        >
          Unread
        </li>
      </ul>
    </section>
  );
}
