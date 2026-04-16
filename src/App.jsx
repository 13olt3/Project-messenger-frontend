import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Header from "./pages/header/header";

import styles from "./App.module.css";

function App() {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("username"),
  );
  const navigate = useNavigate();
  function handleLoginUsername(username) {
    setCurrentUser(username);
  }
  function handleLogout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    setCurrentUser(null);
    navigate("/");
  }

  const contextOutlet = {
    handleLoginUsername,
    handleLogout,
    currentUser,
  };
  return (
    <>
      <div className={styles.app}>
        <Header user={currentUser} handleLogout={handleLogout} />
        <div className={styles.main}>
          <Outlet context={contextOutlet} />
        </div>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}

export default App;
