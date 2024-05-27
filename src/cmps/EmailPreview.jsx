import { Link } from "react-router-dom";
import { utilService } from "../services/util.service.js";

export function EmailPreview({ mail }) {
  const date = new Date(mail.sentAt);

  return (
    <Link className="mail-preview" to={`/mail/${mail.id}`}>
        <span
          className={`mail-from-preview ${
            mail.isRead ? "" : "mail-preview-unread"
          }`}
        >
          From Placeholder
        </span>
        <span
          className={`mail-subject-preview ${
            mail.isRead ? "" : "mail-preview-unread"
          }`}
        >
          {mail.subject}
        </span>
        <span className="mail-body-preview">
          <span>{mail.body}...</span>
        </span>
        <section
          className={`mail-preview-date ${
            mail.isRead ? "" : "mail-preview-unread"
          }`}
        >
          <span>{utilService.getMonthName(date) + " " + date.getDay()}</span>
        </section>
    </Link>
  );
}
