import { useState } from "react";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.app}>
        <section>
          <div>Get Started</div>
        </section>
        <section className={styles.spacer}>Bottom spacer</section>
      </div>
    </>
  );
}

export default App;
