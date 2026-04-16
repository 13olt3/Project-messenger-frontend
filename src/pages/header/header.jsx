import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getUser } from "../../services/userService.js";
import defaultUser from "../../assets/defaultUser.jpg";

import styles from "./Header.module.css";

function Header({ user, handleLogout }) {
  const currentUser = localStorage.getItem("username");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);

  const links = [
    { name: "Signup", link: "/signup" },
    { name: "Login", link: "/login" },
  ];
  const restrictedLinks = [
    { name: "Messages", link: "/messages" },
    { name: "All users", link: "/allusers" },
  ];

  useEffect(() => {
    if (currentUser) {
      async function getUsersData() {
        const data = await getUser(currentUser);

        setUserData(data);
        setLoading(false);
      }
      getUsersData();
    } else {
      async function loading() {
        setLoading(false);
      }
      loading();
    }
  }, [currentUser]);

  if (loading) {
    return <div>loading...</div>;
  }

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
        {currentUser && (
          <Link
            key={"profile"}
            to={`/user/${currentUser}`}
            className={styles.profileLink}
          >
            <img
              src={
                userData?.profile?.profilePic === "default"
                  ? defaultUser
                  : userData?.profile?.profilePic
              }
              className={styles.userAvatar}
              alt={userData?.username}
            />
            Profile
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;

// {
//   <img
//     src={
//       userData.profile.profilePic === "default"
//         ? defaultUser
//         : userData.profile.profilePic
//     }
//     className={styles.profilePic}
//     alt={userData.username}
//   />;
// }
