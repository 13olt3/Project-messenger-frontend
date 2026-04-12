import styles from "./Messages.module.css";
import { getMessages } from "../../services/messagesService.js";
import { useState, useEffect } from "react";

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
    <div>
      {messages.map((eachMessage) => (
        <div key={eachMessage.id}>{eachMessage.body}</div>
      ))}
    </div>
  );
}

export default Messages;
