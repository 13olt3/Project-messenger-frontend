import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import styles from "./Header.module.css";

function Header({ user, handleLogout }) {
  const currentUser = localStorage.getItem("username");
  const links = [
    { name: "Signup", link: "/signup" },
    { name: "Login", link: "/login" },
  ];
  const restrictedLinks = [
    { name: "Messages", link: "/messages" },
    { name: "All users", link: "/allusers" },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {" "}
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
          links.map((link) => {
            return (
              <Link key={link.name} to={link.link}>
                {link.name}
              </Link>
            );
          })
        )}
      </div>
      <div className={styles.right}>
        <Link
          key={"profile"}
          to={`/user/${currentUser}`}
          className={styles.profileLink}
        >
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Header;
