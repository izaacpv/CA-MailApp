import { useState, useRef } from "react";

export function EmailFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const formRef = useRef();

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    value = type === "number" ? +value : value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  return (
    <section className="email-filter">
      <form ref={formRef} onSubmit={onSubmitFilter}>
        <label htmlFor="search"></label>
        <input className="search-input" onChange={handleChange} name="search" id="search" type="text" />
        <button className="search-btn">Search</button>
      </form>
    </section>
  );
}
