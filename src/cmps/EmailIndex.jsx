import { useState } from "react";
import { emailService } from "../services/emailService.js";
import { EmailList } from "./EmailList.jsx";
import { useEffect } from "react";
import { EmailFolderList } from "./EmailFolderList.jsx";
import { EmailHeader } from "./EmailHeader.jsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function EmailIndex() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mails, setMails] = useState(null);
  const [unreadMailsCount, setUnreadMailsCount] = useState(null);
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromSearchParams(searchParams, params)
  );

  useEffect(() => {
    setSearchParams({ search: filterBy.search, read: filterBy.isRead });
    loadMails();
  }, [filterBy, params.folder]);

  useEffect(() => {
    setFilterBy((prev) => ({ ...prev, status: params.folder }));
  }, [params.folder]);

  useEffect(() => {
    loadUnreadCount();
  }, [mails]);

  async function loadMails() {
    try {
      const data = await emailService.query({
        ...filterBy,
        status: params.folder,
      });
      setMails(data);
    } catch (error) {
      throw error;
    }
  }

  async function loadUnreadCount() {
    const unreadMails = await emailService.getUnreadCount();
    setUnreadMailsCount(unreadMails);
  }

  function onRemove(mail) {
    emailService.removeMail(mail);
    // params.folder !== "trash" &&
    //   setMails((prevMail) =>
    //     prevMail.filter(
    //       (mailObj) => !mailObj.removedAt && mailObj.id !== mail.id
    //     )
    //   );
    // params.folder === "trash" &&
    //   setMails((prevMail) =>
    //     prevMail.filter((mailObj) => mailObj.id !== mail.id)
    //   );
  }

  async function onUpdateMail(newMail) {
    try {
      await emailService.save(newMail);
      if (params.folder === "trash") {
        setMails((prevMail) =>
          prevMail.filter((mailObj) => mailObj.id !== newMail.id)
        );
      } else {
        setMails((prevMails) =>
          prevMails.map((mail) => (mail.id === newMail.id ? newMail : mail))
        );
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function handleStar(mail) {
    const mailToSave = { ...mail, isStarred: !mail.isStarred };
    await emailService.save(mailToSave);
    const mailsToSave = mails.map((arrMail) =>
      arrMail.id === mail.id ? mailToSave : arrMail
    );
    setMails(mailsToSave);
  }

  async function onRead(mail, isPreview) {
    const mailToSave = isPreview
      ? { ...mail, isRead: true }
      : { ...mail, isRead: !mail.isRead };
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
      <EmailHeader
        onSetFilterBy={onSetFilterBy}
        filterBy={filterBy}
        searchParams={searchParams}
      />
      <EmailFolderList
        mails={mails}
        params={params}
        navigate={navigate}
        unreadMailsCount={unreadMailsCount}
      />
      <section className="email-content">
        <EmailList
          mails={mails}
          handleStar={handleStar}
          onRemove={onRemove}
          onRead={onRead}
          onUpdateMail={onUpdateMail}
          params={params}
        />
      </section>
    </section>
  );
}
