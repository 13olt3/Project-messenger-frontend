import styles from "./User.module.css";
import defaultUser from "../../assets/defaultUser.jpg";
import { getUser } from "../../services/userService.js";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import EditBio from "../../components/editBio/editBio";

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
    <div className={styles.page}>
      <div className={styles.profileSummary}>
        <div className={styles.picCanvas}>
          <img
            src={user.profile.profilePic === "default" ? defaultUser : user.profile.profilePic}
            className={styles.profilePic}
            alt={user.username}
          />
          {username === localStorage.getItem("username") && (
            <Link to="/user/upload" className={styles.uploadLink}>
              Change photo
            </Link>
          )}
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.username}>{user.username}</h1>
          <span className={styles.bioLabel}>Bio</span>
          {user.profile.bio ? (
            <p className={styles.bio}>{user.profile.bio}</p>
          ) : (
            <p className={styles.bioEmpty}>No bio yet.</p>
          )}
          {username === localStorage.getItem("username") && <EditBio />}
        </div>
      </div>
      <div className={styles.actions}>
        <Link to={`/conversation/${user.username}`} className={styles.messageBtn}>
          Message {user.username}
        </Link>
      </div>
    </div>
  );
}

export default User;
