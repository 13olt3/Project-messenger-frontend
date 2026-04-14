import styles from "./Conversation.module.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getConversation,
  sendMessage,
} from "../../services//messagesService.js";

function Conversation() {
  //need to have a GET to get all the messages between the two
  //need to have a POST to send message to the user.
  const { username } = useParams();
  const [conversationData, setConversationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentData, setCommentData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getConversationData(username) {
      const data = await getConversation(username);
      setConversationData(data);
      console.log(data);

      setLoading(false);
    }
    getConversationData(username);
  }, [username]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  }

  function handleChange(e) {
    e.preventDefault();
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setCommentData((prevData) => {
      return { ...prevData, [inputName]: inputValue };
    });
  }
  async function handleSendComment(e) {
    e.preventDefault();
    console.log(username);
    console.log(commentData);
    await sendMessage(username, commentData.body);
    navigate(0);
  }

  if (loading) return <div id="center">Loading conversation...</div>;

  return (
    <div className={styles.chatPanel}>
      <div className={styles.conversationPanel}>
        {conversationData.map((message) =>
          message.sender.username === localStorage.getItem("username") ? (
            <div key={message.id} className={styles.userMsg}>
              {message.body}
              <div>{formatDate(message.time)}</div>
            </div>
          ) : (
            <div key={message.id} className={styles.receieverMsg}>
              {message.body}
              <div>{formatDate(message.time)}</div>
            </div>
          ),
        )}
      </div>
      <div>
        <form onSubmit={(e) => handleSendComment(e)}>
          <textarea
            rows="10"
            cols="40"
            type="text"
            name="body"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
  // if message.sender.username === localStorage.getItem("username") show in right side
  // else show message on left side
}

export default Conversation;
