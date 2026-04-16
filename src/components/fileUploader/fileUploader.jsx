import { useState } from "react";
import styles from "./FileUploader.module.css";
import { uploadProfilePic } from "../../services/userService.js";
import { useNavigate } from "react-router";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  async function handleUpload() {
    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const response = await uploadProfilePic(formData);
        console.log(response);
        navigate(`/user/${localStorage.getItem("username")}`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className={styles.uploader}>
      <h2 className={styles.title}>Upload profile picture</h2>
      <div className={styles.dropzone}>
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
      </div>
      {file && (
        <div className={styles.fileDetails}>
          <ul>
            <li><strong>Name</strong>{file.name}</li>
            <li><strong>Type</strong>{file.type}</li>
            <li><strong>Size</strong>{(file.size / 1024).toFixed(1)} KB</li>
          </ul>
        </div>
      )}
      {file && (
        <button onClick={handleUpload} className={styles.uploadBtn}>
          Upload photo
        </button>
      )}
    </div>
  );
};

export default FileUploader;
