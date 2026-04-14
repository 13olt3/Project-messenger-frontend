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
    // We will fill this out later
    if (file) {
      console.log("Uploading file...");
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
    <>
      <div className="input-group">
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleUpload} className="submit">
          Upload a file
        </button>
      )}
    </>
  );
};

export default FileUploader;
