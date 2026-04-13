import styles from "./Messages.module.css";
import { getMessages } from "../../services/messagesService.js";
import { useState, useEffect } from "react";
import { Link } from "react-router";

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
    <div className={styles.contacts}>
      {messages.map((eachMessage) => (
        <Link key={eachMessage.id} to={`/conversation/${eachMessage.username}`}>
          {eachMessage.username}
        </Link>
      ))}
    </div>
  );
}

export default Messages;
