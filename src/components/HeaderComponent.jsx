import React from "react";
import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          {/* Logo/Title on the leftmost side */}
          <a href="http://localhost:3000" className="navbar-brand fw-bold">
            Todo Management Application
          </a>

          {/* Navbar links aligned to the right */}
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item mx-2">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold" : ""}`
                  }
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  to="/todos"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold" : ""}`
                  }
                >
                  Todos
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;


