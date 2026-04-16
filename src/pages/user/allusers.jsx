import styles from "./User.module.css";
import { getUsers } from "../../services/userService.js";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import defaultUser from "../../assets/defaultUser.jpg";

function Allusers() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUsersData() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }
    getUsersData();
  }, []);

  if (loading) return <div id="center">Loading page...</div>;
  return (
    <div className={styles.userContainer}>
      <h2 className={styles.userListHeading}>All Users</h2>
      {users.map((eachUser) => {
        const pic = eachUser.profile?.profilePic;
        const src = pic && pic !== "default" ? pic : defaultUser;
        return (
          <Link
            key={eachUser.id}
            to={`/user/${eachUser.username}`}
            className={styles.userItem}
          >
            <img
              src={src}
              alt={eachUser.username}
              className={styles.userAvatar}
            />
            {eachUser.username}
          </Link>
        );
      })}
    </div>
  );
}

export default Allusers;
