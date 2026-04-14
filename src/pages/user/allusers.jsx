import styles from "./User.module.css";
import { getUsers } from "../../services/userService.js";
import { useState, useEffect } from "react";
import { Link } from "react-router";

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
      {users.map((eachUser) => {
        return (
          <Link key={eachUser.id} to={`/user/${eachUser.username}`}>
            {eachUser.username}
          </Link>
        );
      })}
    </div>
  );
}

export default Allusers;
