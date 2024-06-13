import { useNavigate } from "react-router-dom";
import starOn from "../assets/star-selected.png";
import starOff from "../assets/star.png";
import { utilService } from "../services/util.service.js";
import binImg from "../assets/bin.png";
import readImg from "../assets/read-mail.png";
import restoreImg from "../assets/restore.png";

export function EmailPreview({ mail, onUpdateMail, onRemove, folder }) {
  const date = new Date(mail.sentAt);
  const navigate = useNavigate();

  function onReadPreview() {
    const mailToUpdate = { ...mail, isRead: true };
    onUpdateMail(mailToUpdate);
    navigate(`/mail/${folder}/${mail.id}`);
  }

  function onReadAction(ev) {
    ev.stopPropagation();
    const mailToUpdate = { ...mail, isRead: !mail.isRead };
    onUpdateMail(mailToUpdate);
  }

  function onHandleStar(ev) {
    ev.stopPropagation();
    const mailToUpdate = { ...mail, isStarred: !mail.isStarred };
    onUpdateMail(mailToUpdate);
  }

  function onRemoveMail(ev) {
    ev.stopPropagation();
    if (!mail.removedAt) {
      const mailToUpdate = { ...mail, removedAt: Date.now() };
      onUpdateMail(mailToUpdate);
    } else {
      onRemove(mail);
    }
  }

  function onRestoreMail(ev) {
    ev.stopPropagation()
    const mailToUpdate = {...mail, removedAt: null}
    onUpdateMail(mailToUpdate)
  }


  const isRead = mail.isRead ? "" : "mail-preview-unread";
  return (
    <section className="mail-preview" onClick={onReadPreview}>
      <img
        src={mail.isStarred ? starOn : starOff}
        className="star"
        alt="star"
        onClick={onHandleStar}
      />
      <span className={`mail-from-preview ${isRead}`}>
        {mail.from.slice(0, mail.from.indexOf("@"))}
      </span>
      <span className={`mail-subject-preview ${isRead}`}>{mail.subject}</span>
      <span className="mail-body-preview">
        <span>{mail.body}...</span>
      </span>
      <section className="preview-actions">
        {mail.removedAt && (
          <img src={restoreImg} alt="restore" title="restore" className="restore-icon" onClick={onRestoreMail}/>
        )}
        {!mail.removedAt && (
          <img
            className="bin-icon"
            src={binImg}
            alt="remove"
            title="delete"
            onClick={onRemoveMail}
          />
        )}
        <img
          title="Mark as read"
          className="read-icon"
          src={readImg}
          alt="read"
          onClick={onReadAction}
        />
      </section>
      <section className={`mail-preview-date ${isRead}`}>
        <span>{utilService.getMonthName(date) + " " + date.getDay()}</span>
      </section>
    </section>
  );
}
