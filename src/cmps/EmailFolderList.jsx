import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      setFilterByToEdit({ isRead: true });
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
        <Link to="/mail">
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
        </Link>
        <Link to="/mail">
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
        </Link>
        <Link to="/mail">
          <li
            className={`folder-item ${
              filterByToEdit.isRead ? "active-filter" : ""
            }`}
            onClick={() => handleSelection("unread")}
          >
            Unread
          </li>
        </Link>
      </ul>
    </section>
  );
}
