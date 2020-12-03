import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink to="/" className="navbar-brand">
        <strong>OB</strong>
        <small>onlinebook.com</small>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button" 
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink to="/" className="nav-link">
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink to="/publisher" className="nav-link">
              Publisher
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
