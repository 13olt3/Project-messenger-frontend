import styles from "./Home.module.css";
import { Link } from "react-router";

function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.icon}>💬</div>
      <h1 className={styles.title}>Messenger</h1>
      <p className={styles.subtitle}>
        A simple, fast way to chat with anyone. Sign in to start messaging.
      </p>
      <Link to="/login" className={styles.cta}>Get started</Link>
    </div>
  );
}

export default Home;
