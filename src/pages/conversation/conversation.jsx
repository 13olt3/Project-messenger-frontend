import styles from "./Conversation.module.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getConversation,
  sendMessage,
} from "../../services//messagesService.js";

function Conversation() {
  const { username } = useParams();
  const currentUser = localStorage.getItem("username");
  const [conversationData, setConversationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentData, setCommentData] = useState("");

  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getConversationData(username) {
      const data = await getConversation(username);
      setConversationData(data);
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
    const { name, type, value, files } = e.target;
    const finalValue = type === "file" ? files[0] : value;

    setCommentData((prevData) => {
      return {
        ...prevData,
        [name]: finalValue,
      };
    });

    if (type === "file" && files[0]) {
      const objectUrl = URL.createObjectURL(files[0]);
      setPreview(objectUrl);
    }
  }

  async function handleSendComment(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgMsg", commentData.imgMsg);
    formData.append("body", commentData.body);
    await sendMessage(username, formData);
    setCommentData({ body: "", imgMsg: null });
    setPreview(null);
    navigate(0);
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (loading) return <div id="center">Loading conversation...</div>;

  return (
    <div className={styles.chatPanel}>
      <div className={styles.conversationPanel}>
        {conversationData.map((message) =>
          message.sender.username === currentUser ? (
            <div key={message.id} className={styles.userMsg}>
              {message.body}
              {message.imageUrl && (
                <img
                  className={styles.imgPreview}
                  src={message.imageUrl}
                  alt="chat"
                />
              )}
              <span className={styles.timestamp}>{formatDate(message.time)}</span>
            </div>
          ) : (
            <div key={message.id} className={styles.receieverMsg}>
              {message.body}
              {message.imageUrl && (
                <img
                  className={styles.imgPreview}
                  src={message.imageUrl}
                  alt="chat"
                />
              )}
              <span className={styles.timestamp}>{formatDate(message.time)}</span>
            </div>
          ),
        )}
      </div>
      <div className={styles.inputArea}>
        <form onSubmit={(e) => handleSendComment(e)}>
          <div className={styles.inputRow}>
            <textarea
              rows="1"
              type="text"
              name="body"
              placeholder={`Message ${username}…`}
              value={commentData.body}
              onChange={(e) => handleChange(e)}
            />
            <button type="submit" className={styles.sendBtn} title="Send">
              ➤
            </button>
          </div>
        </form>
        <div className={styles.fileRow}>
          <input
            id="file"
            type="file"
            name="imgMsg"
            onChange={(e) => handleChange(e)}
            accept="image/png, image/jpeg"
          />
        </div>
        {preview && (
          <div className={styles.previewSection}>
            <img src={preview} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Conversation;
