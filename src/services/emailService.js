import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
  query,
  save,
  removeMail,
  getDefaultFilter,
  getMailById,
};

const MAILS_KEY = "emailDB";

const loggedUser = {
  email: "user@appsus.com",
  fullname: "Ahla Gever",
};

async function query(filterBy) {
  let mails = await storageService.query(MAILS_KEY);
  console.log(filterBy);

  if (filterBy) {
    let { search, isRead, status } = filterBy;
    mails = mails.filter(
      (mail) =>
        (mail.subject.toLowerCase().includes(search.toLowerCase()) ||
          mail.body.toLowerCase().includes(search.toLowerCase())) &&
        ((!mail.isRead && isRead) ||
          (mail.isStarred && status === "starred" && !isRead) ||
          (status === "inbox" && !isRead))
    );
    return mails;
  }
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAILS_KEY, mail);
  } else {
    return storageService.post(MAILS_KEY, mail);
  }
}

function getMailById(id) {
  return storageService.get(MAILS_KEY, id);
}

function removeMail(id) {
  storageService.remove(MAILS_KEY, id);
}

function getDefaultFilter() {
  return {
    status: "inbox",
    search: "",
    isRead: null,
  };
}

function _createMail(
  subject,
  body,
  isRead,
  isStarred,
  sentAt,
  removedAt,
  from,
  to
) {
  return {
    id: utilService.makeId(),
    subject,
    body,
    isRead,
    isStarred,
    sentAt,
    removedAt,
    from,
    to,
  };
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAILS_KEY);
  if (!mails) {
    mails = [];
    for (let i = 0; i < 30; i++) {
      mails.push(
        _createMail(
          utilService.getRandomGreeting(),
          utilService.makeLorem(50),
          false,
          false,
          Math.floor(Date.now() / 1000),
          null,
          `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`,
          loggedUser.email
        )
      );
    }
    for (let i = 0; i < 20; i++) {
      mails.push(
        _createMail(
          utilService.getRandomGreeting(),
          utilService.makeLorem(50),
          false,
          false,
          Math.floor(Date.now() / 1000),
          null,
          loggedUser.email,
          `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`
        )
      );
    }
  }
  utilService.saveToStorage(MAILS_KEY, mails);
}

_createMails();
