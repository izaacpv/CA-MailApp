import { EmailPreview } from "./EmailPreview";
import { Outlet } from "react-router-dom";

export function EmailList({ mails, handleStar, onRemove, onRead, onUpdateMail, params }) {
  if (!mails.length) return <p>No mails found</p>;

  function generateMails() {
    return (
      mails.map((mail) => {
        return (
          <li
            className={`${mail.isRead ? "mail-read" : ""} mail-li`}
            key={mail.id}
          >
            <EmailPreview
              mail={mail}
              onRead={onRead}
              onRemove={onRemove}
              onUpdateMail={onUpdateMail}
              handleStar={handleStar}
              folder={params.folder}
            />
          </li>
        );
      })
    )
  }

  return (
    <section className="email-list">
      <ul>
        {!params.mailId && generateMails()}
      </ul>
      <Outlet />
    </section>
  );
}