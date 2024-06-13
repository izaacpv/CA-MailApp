import { useState, useRef, useEffect } from "react";
import { emailService } from "../services/emailService";
import { utilService } from "../services/util.service";

export function EmailFilter({ setFilterBy, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const debouncedSetFilter = useRef(utilService.debounce(setFilterBy, 500));

  useEffect(() => {
    debouncedSetFilter.current(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { name: field, value } = target
    if (field === 'isRead') {
        if (value === 'all') value = null
        else value = (value === 'read')
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { search, isRead } = filterByToEdit;

  return (
    <section className="email-filter">
      <form name="filter-form">
        <label htmlFor="search"></label>
        <input
          className="search-bar"
          onChange={handleChange}
          name="search"
          id="search"
          type="text"
          value={search || ""}
        />
      </form>
      <label htmlFor="isRead"></label>
      <select
        value={emailService.convertFilterIsRead(isRead)}
        name="isRead"
        onChange={handleChange}
      >
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
    </section>
  );
}
