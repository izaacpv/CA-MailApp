import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
  query,
  save,
  removeMail,
  getDefaultFilter,
  getMailById,
  getFolders,
  getUnreadCount,
  getFilterFromSearchParams,
  convertFilterIsRead,
};

const MAILS_KEY = "emailDB";

const loggedUser = {
  email: "user@appsus.com",
  fullname: "Ahla Gever",
};

async function query(filterBy) {
  let mails = await storageService.query(MAILS_KEY);
  mails = _filterMails(mails, filterBy);
  return mails;
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

function removeMail(mail) {
    storageService.remove(MAILS_KEY, mail.id);
}

function getDefaultFilter() {
  return {
    status: "inbox",
    search: "",
    isRead: null,
  };
}

function convertFilterIsRead(isRead) {
  if (isRead === null) return "all";
  return isRead ? "read" : "unread";
}

function getFilterFromSearchParams(searchParams, params) {
  return {
    status: params.folder || "inbox",
    search: searchParams.get("search") || "",
    isRead: null,
  };
}

async function getUnreadCount() {
  const mails = await storageService.query(MAILS_KEY);
  return mails.filter((mail) => !mail.isRead && mail.from !== loggedUser.email).length;
}

function _createMail(
  subject = "",
  body = "",
  sentAt = "",
  from = "",
  to = "",
  isRead = false,
  isStarred = false,
  removedAt = null
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

function getFolders() {
  return [
    {
      path: "inbox",
      icon: "inbox",
      name: "Inbox",
    },
    {
      path: "starred",
      icon: "star",
      name: "Starred",
    },
    {
      path: "sent",
      icon: "sent",
      name: "Sent",
    },
    {
      path: "draft",
      icon: "draft",
      name: "Drafts",
    },
    {
      path: "trash",
      icon: "bin",
      name: "Trash",
    },
  ];
}

function _filterMails(mails, filterBy) {
  if (filterBy.status) {
    mails = _filterMailsByFolder(mails, filterBy.status);
  }
  if (filterBy.search) {
    const regExp = new RegExp(filterBy.search, "i");
    mails = mails.filter(
      (mail) =>
        regExp.test(mail.subject) ||
        regExp.test(mail.body) ||
        regExp.test(mail.from)
    );
  }
  if (filterBy.isRead !== null && filterBy.isRead !== undefined) {
    mails = mails.filter((mail) => mail.isRead === filterBy.isRead);
  }
  return mails;
}

function _filterMailsByFolder(mails, status) {
  switch (status) {
    case "inbox":
      mails = mails.filter(
        (mail) => mail.to === loggedUser.email && !mail.removedAt
      );
      break;
    case "starred":
      mails = mails.filter((mail) => mail.isStarred && !mail.removedAt);
      break;
    case "sent":
      mails = mails.filter(
        (mail) => mail.from === loggedUser.email && !mail.removedAt
      );
      break;
    case "trash":
      mails = mails.filter((mail) => mail.removedAt);
      break;
  }
  return mails;
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAILS_KEY);
  if (!mails) {
    mails = [];
    for (let i = 0; i < 30; i++) {
      mails.push(
        _createMail(
          utilService.makeLorem(10),
          utilService.makeLorem(50),
          Math.floor(Date.now() / 1000),
          `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`,
          loggedUser.email,
          false,
          false,
          null
        )
      );
    }
    for (let i = 0; i < 20; i++) {
      mails.push(
        _createMail(
          utilService.makeLorem(10),
          utilService.makeLorem(50),
          Math.floor(Date.now() / 1000),
          loggedUser.email,
          `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`,
          false,
          false,
          null
        )
      );
    }
  }
  utilService.saveToStorage(MAILS_KEY, mails);
}

_createMails();
