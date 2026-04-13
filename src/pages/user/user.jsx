import styles from "./User.module.css";
import defaultUser from "../../assets/defaultUser.jpg";
import { getUser } from "../../services/userService.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  useEffect(() => {
    async function getUsersData() {
      const data = await getUser(username);
      setUser(data);
      setLoading(false);
    }
    getUsersData();
  }, [username]);

  if (loading) return <div id="center">Loading page...</div>;
  return (
    <div>
      <div className={styles.profileSummary}>
        <h1 className={styles.username}>{user.username}</h1>
        <div className={styles.bio}>{user.profile.bio}</div>
        <div className={styles.picCanvas}>
          {user.profile.profilePic === "default" ? (
            <img src={defaultUser} className={styles.profilePic}></img>
          ) : (
            "userPic here"
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
