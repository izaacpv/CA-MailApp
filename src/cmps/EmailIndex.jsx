import { useState } from "react";
import { emailService } from "../services/emailService.js";
import { EmailList } from "./EmailList.jsx";
import { useEffect } from "react";
import { EmailFilter } from "./EmailFilter.jsx";
import { EmailFolderList } from "./EmailFolderList.jsx";

export function EmailIndex() {
  const [mails, setMails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

  useEffect(() => {
    loadMails();
  }, [filterBy]);

  async function loadMails() {
    try {
      const data = await emailService.query(filterBy);
      setMails(data);
    } catch (error) {
      throw error;
    }
  }

  function onRemove(id) {
    emailService.removeMail(id);
    setMails((prevMail) => prevMail.filter((mail) => mail.id !== id));
  }

  async function handleStar(mail) {
    const mailToSave = { ...mail, isStarred: !mail.isStarred };
    await emailService.save(mailToSave);
    const mailsToSave = mails.map((arrMail) =>
      arrMail.id === mail.id ? mailToSave : arrMail
    );
    setMails(mailsToSave);
  }

  async function onRead(mail) {
    const mailToSave = { ...mail, isRead: !mail.isRead };
    await emailService.save(mailToSave);
    const mailsToSave = mails.map((arrMail) =>
      arrMail.id === mail.id ? mailToSave : arrMail
    );
    setMails(mailsToSave);
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  if (!mails) return <div>loading...</div>;
  return (
    <section className="email-index">
      <div className="side-bar">
        <div className="compose">Compose TODO</div>
        <EmailFolderList onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
      </div>
      <section className="email-content">
        <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
        <EmailList
          mails={mails}
          handleStar={handleStar}
          onRemove={onRemove}
          onRead={onRead}
        />
      </section>
    </section>
  );
}
