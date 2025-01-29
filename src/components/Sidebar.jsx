import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar vh-100">
      <nav>
        <ul>
          <li className="item text-center">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
              <i className="bi h5"></i>{" "}
              <span className="h6 fw-semibold">Carousel</span>
            </NavLink>
          </li>
          <li className="item text-center">
            <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>
              <i className="bi h5"></i>{" "}
              <span className="h6 fw-semibold">Our Services</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
