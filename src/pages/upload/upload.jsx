import FileUploader from "../../components/fileUploader/fileUploader";
import styles from "./Upload.module.css";

function Upload() {
  return (
    <div className={styles.page}>
      <FileUploader />
    </div>
  );
}

export default Upload;
