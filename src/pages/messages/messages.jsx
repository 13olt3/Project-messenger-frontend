import styles from "./Messages.module.css";
import { getMessages } from "../../services/messagesService.js";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import defaultUser from "../../assets/defaultUser.jpg";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessages()
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Component caught error:", err.response?.status);
        setLoading(false);
      });
  }, []);

  if (loading) return <div id="center">Loading posts...</div>;

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Messages</h2>
      <div className={styles.contacts}>
        {messages.length === 0 ? (
          <p className={styles.empty}>No conversations yet</p>
        ) : (
          messages.map((eachMessage) => {
            const pic = eachMessage.profile?.profilePic;
            const src = pic && pic !== "default" ? pic : defaultUser;
            return (
              <Link
                key={eachMessage.id}
                to={`/conversation/${eachMessage.username}`}
                className={styles.contact}
              >
                <img
                  src={src}
                  alt={eachMessage.username}
                  className={styles.avatar}
                />
                {eachMessage.username}
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Messages;
