import React from "react";
import { NavLink } from "react-router-dom";
// import { createHashHistory } from "history";
// export const history = createHashHistory();
let isLogged = sessionStorage.getItem("isLogged");

export default function Header(props) {
  isLogged = sessionStorage.getItem("isLogged");
  const logOut = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <nav>
      <ul>
        <li>
          <a className="nav-title" href="/">
            <i className="fas fa-calendar-check" /> TODO24X7
          </a>
        </li>
        {isLogged ? (
          <li>
            <NavLink to="/profile">
              <span title="My Profile">
                <i className="fas fa-user" />
              </span>
            </NavLink>
          </li>
        ) : null}
        {isLogged ? (
          <li>
            <a id="logout" onClick={logOut}>
              <i className="fas fa-sign-out-alt" />
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
