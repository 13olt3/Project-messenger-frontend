import { editBio } from "../../services/userService.js";
import { useNavigate } from "react-router";
import { useState } from "react";
import styles from "./EditBio.module.css";

function EditBio({ cancelEdit }) {
  const [bioData, setBioData] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    let inputValue = e.target.value;
    setBioData(inputValue);
  }
  async function handleEdit() {
    const result = await editBio(localStorage.getItem("username"), bioData);
    console.log(result);
    navigate(0);
  }

  function edit(e) {
    e.preventDefault();
    setShowEdit(!showEdit);
  }
  return (
    <>
      {" "}
      <form
        onSubmit={(e) => handleEdit(e)}
        className={`${styles.form} ${showEdit ? "" : styles.hidden}`}
      >
        <label htmlFor="editPost">Bio:</label>
        <textarea
          id="editPost"
          rows="10"
          cols="40"
          type="text"
          name="body"
          onChange={handleChange}
          visibility="hidden"
        />
        <button type="submit">submit change</button>
        <button onClick={edit}>Cancel edit</button>
      </form>
      <button onClick={edit} className={`${showEdit ? styles.hidden : ""}`}>
        Edit Bio
      </button>
    </>
  );
}

export default EditBio;
