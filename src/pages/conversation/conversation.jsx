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
      // console.log(data);

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

  // function handleChange(e) {
  //   let inputName = e.target.name;
  //   let inputValue = e.target.value;
  //   setCommentData((prevData) => {
  //     return { ...prevData, [inputName]: inputValue };
  //   });
  // }
  function handleChange(e) {
    const { name, type, value, files } = e.target;

    // If it's a file input, grab the first file; otherwise, grab the text value
    const finalValue = type === "file" ? files[0] : value;

    setCommentData((prevData) => {
      return {
        ...prevData,
        [name]: finalValue,
      };
    });

    // Optional: If you want to show a preview immediately (as we discussed)
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
    // Cleanup function to free up memory
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
                ></img>
              )}
              <div>{formatDate(message.time)}</div>
            </div>
          ) : (
            <div key={message.id} className={styles.receieverMsg}>
              {message.body}
              {message.imageUrl && (
                <img
                  className={styles.imgPreview}
                  src={message.imageUrl}
                  alt="chat"
                ></img>
              )}

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
            value={commentData.body}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Send</button>
        </form>
        <div className="input-group">
          <input
            id="file"
            type="file"
            name="imgMsg"
            onChange={(e) => handleChange(e)}
            accept="image/png, image/jpeg"
          />
        </div>
        {preview && (
          <section>
            <img src={preview} alt="" className={styles.imgPreview} />
          </section>
        )}
      </div>
    </div>
  );
  // if message.sender.username === localStorage.getItem("username") show in right side
  // else show message on left side
}

export default Conversation;
