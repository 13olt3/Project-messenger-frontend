import { editBio } from "../../services/userService.js";
import { useNavigate } from "react-router";
import { useState } from "react";
import styles from "./EditBio.module.css";

function EditBio() {
  const [bioData, setBioData] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    setBioData(e.target.value);
  }

  async function handleEdit(e) {
    e.preventDefault();
    const result = await editBio(localStorage.getItem("username"), bioData);
    console.log(result);
    navigate(0);
  }

  function edit(e) {
    e.preventDefault();
    setShowEdit(!showEdit);
  }

  return (
    <div className={styles.editWrapper}>
      <form
        onSubmit={handleEdit}
        className={`${styles.form} ${showEdit ? "" : styles.hidden}`}
      >
        <textarea
          id="editPost"
          rows="4"
          className={styles.textarea}
          name="body"
          placeholder="Write something about yourself…"
          onChange={handleChange}
        />
        <div className={styles.formActions}>
          <button type="submit" className={styles.saveBtn}>Save</button>
          <button onClick={edit} className={styles.cancelBtn}>Cancel</button>
        </div>
      </form>
      {!showEdit && (
        <button onClick={edit} className={styles.editTrigger}>Edit bio</button>
      )}
    </div>
  );
}

export default EditBio;
