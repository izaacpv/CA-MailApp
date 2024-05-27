import { NavLink } from "react-router-dom";
import imgUrl from "../assets/logo.png"

export function AppHeader() {
  return (
    <header className="app-header">
      <section className="container">
        {/* <h1 className="logo">Mail</h1> */}
        <NavLink className="logo" to="/"><img src={imgUrl} alt="logo" className="logo-img" /><h1 className="logo-text">Mail App</h1></NavLink>
        <nav className="items">
          <NavLink className="item" to="/">Home</NavLink>
          <NavLink className="item" to="/about">About Us</NavLink>
          <NavLink className="item" to="/mail">Mail</NavLink>
        </nav>
      </section>
    </header>
  );
}
