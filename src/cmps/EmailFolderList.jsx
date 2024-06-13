import star from "../assets/star.png";
import inbox from "../assets/inbox.png";
import binImg from "../assets/bin.png";
import sentImg from "../assets/sent.png";
import draftImg from "../assets/draft.png";
import { emailService } from "../services/emailService.js";

export function EmailFolderList({ params, navigate, unreadMailsCount }) {
  function handleSelection(path) {
    if (path === currFolder && !params.mailId) return;
    const url = `/mail/${path}`;
    navigate(url);
  }

  const currFolder = params.folder;
  const folders = emailService.getFolders();
  const folderIcons = [inbox, star, sentImg, draftImg, binImg];
  return (
    <section className="email-folder-list">
      <ul className="folder-items">
        {folders.map((folder, idx) => (
          <li
            key={folder.path}
            className={`folder-item ${
              folder.path === currFolder ? "active-filter" : ""
            }`}
            onClick={() => handleSelection(folder.path)}
          >
            <img src={folderIcons[idx]} className="folder-icon" />
            <span>{folder.name}</span>
            {folder.path === 'inbox' && <span className="unread-count">{unreadMailsCount}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
