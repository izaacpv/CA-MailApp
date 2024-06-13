import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emailService } from "../services/emailService";
import backIcon from "../assets/back.png";
import binImg from "../assets/bin.png";
import readImg from "../assets/read-mail.png";
import starOn from "../assets/star-selected.png";
import starOff from "../assets/star.png";
import { utilService } from "../services/util.service";

export function EmailDetails() {
  const navigate = useNavigate()
  const [mail, setMail] = useState(null);
  const params = useParams();
  let date;

  if (mail) {
    date = new Date(mail.sentAt);
  }

  useEffect(() => {
    loadMail();
  }, [params.mailId]);

  async function loadMail() {
    const mail = await emailService.getMailById(params.mailId);
    setMail(mail);
  }

  function onRemove() {
    emailService.removeMail(mail)
    // navigate(`/mail/${params.folder}`)
  }

  if (!mail) return <div>loading...</div>;
  return (
    <section className="email-details">
      <section className="email-details-content">
        <nav className="email-details-action-nav">
          <img onClick={() => navigate(`/mail/${params.folder}`)} src={backIcon} alt="" className="back-btn details-nav-item" />
          <img src={readImg} alt="" className="unread-btn details-nav-item" />
          <img onClick={onRemove} src={binImg} alt="" className="unread-btn details-nav-item" />
          <img
            src={mail.isStarred ? starOn : starOff}
            className="star details-nav-item"
            alt="star"
          />
        </nav>
        <section className="mail-content">
          <section className="mail-header">
            <h1>{mail.subject}</h1>
            <span>{`${utilService.getMonthName(
              date
            )} ${date.getDay()} ${date.getFullYear()}`}</span>
          </section>
          <span>{mail.body}</span>
        </section>
      </section>
    </section>
  );
}
