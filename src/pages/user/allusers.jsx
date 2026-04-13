import styles from "./User.module.css";
import { getUsers } from "../../services/userService.js";
import { useState, useEffect } from "react";

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
    <div>
      {users.map((eachUser) => {
        return <div key={eachUser.id}>{eachUser.username}</div>;
      })}
    </div>
  );
}

export default Allusers;
