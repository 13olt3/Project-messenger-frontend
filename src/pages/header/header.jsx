import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import styles from "./Header.module.css";

function Header({ user, handleLogout }) {
  const links = [
    { name: "Signup Page", link: "/signup" },
    { name: "Login Page", link: "/login" },

    { name: "All users", link: "/allusers" },
  ];
  const restrictedLinks = [{ name: "Messages", link: "/messages" }];

  return (
    <div className={styles.header}>
      {links.map((link) => (
        <Link key={link.name} to={link.link}>
          {link.name}
        </Link>
      ))}
      {user
        ? restrictedLinks.map((link) => (
            <Link key={link.name} to={link.link}>
              {link.name}
            </Link>
          ))
        : ""}
      {user ? (
        <button onClick={(e) => handleLogout(e)} className={styles.linkStyle}>
          Logout
        </button>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
    </div>
  );
}

export default Header;
