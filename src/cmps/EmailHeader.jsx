import gmailLogo from "../assets/gmail-logo.png";
import { EmailFilter } from "./EmailFilter";

export function EmailHeader({ onSetFilterBy, filterBy, searchParams }) {
  function setFilterBy(filterBy) {
    onSetFilterBy(filterBy);
  }

  return (
    <section className="email-header">
      <img src={gmailLogo} alt="gmail" />
      <EmailFilter
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        searchParams={searchParams}
      />
    </section>
  );
}
