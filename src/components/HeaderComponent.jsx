import React from "react";
import { NavLink } from "react-router-dom";
import { isUsrLoggedIn, logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const isAuth=isUsrLoggedIn();
  const navigator=useNavigate();
   function handleLogout(){
    logout();
    navigator('/login')
   }
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
       
          <div className="d-flex align-items-center">
            <a href="http://localhost:3000" className="navbar-brand fw-bold me-3">
              Todo Management Application
            </a>
            { isAuth &&
            <NavLink
              to="/todos"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "active fw-bold" : ""}`
              }
            >
              Todos
            </NavLink>}
          </div>


          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              { !isAuth&&
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
              }
              {!isAuth && <li className="nav-item mx-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold" : ""}`
                  }
                >
                  Login
                </NavLink>
              </li>}
              {isAuth && <li className="nav-item mx-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold" : ""}`
                  }
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </li>}
              
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
