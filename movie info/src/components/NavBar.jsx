import React from "react";
import "../assets/styles/NavBar.css";
import { Link } from "react-router-dom";

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      <div className="tabs">
        <h2>Movies</h2>
        <h2>Watch List</h2>
      </div>

      <div className="nav-btns">
        {user ? (
          <>
            <strong className="wlc">Welcome, {user.name}!</strong>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <button>Login</button>
            </Link>

            <Link to={"/signup"}>
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
