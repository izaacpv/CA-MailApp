import { EmailPreview } from "./EmailPreview";
import starOn from "../assets/star-selected.png";
import starOff from "../assets/star-unselected.png";
import binImg from "../assets/bin.png";
import readImg from "../assets/read-mail.png"

export function EmailList({ mails, handleStar, onRemove, onRead }) {
  return (
    <section className="email-list">
      <ul>
        {mails.map((mail) => {
          return (
            <li className={mail.isRead ? 'mail-read' : ''} key={mail.id}>
              <img
                src={mail.isStarred ? starOn : starOff}
                className="star"
                alt="star"
                onClick={() => handleStar(mail)}
              />
              <EmailPreview mail={mail} />
              <section className="preview-actions">
                <img className="bin-icon" src={binImg} alt="remove" onClick={() => onRemove(mail.id)}/>
                <img className="read-icon" src={readImg} alt="read" onClick={() => onRead(mail)}/>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
