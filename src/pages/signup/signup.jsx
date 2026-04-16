import styles from "./Signup.module.css";
import { signupUser } from "../../services/userService.js";
import { useState } from "react";
import { useNavigate } from "react-router";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPw: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleSignup(e) {
    e.preventDefault();

    const username = formData.username;
    const password = formData.password;
    const email = formData.email;
    const confirmPw = formData.confirmPw;
    if (password !== confirmPw) {
      setError("Passwords do not match");
      return error;
    }
    await signupUser(username, email, password, confirmPw);
    navigate("/");
  }

  function handleChange(e) {
    e.preventDefault();
    let inputName = e.target.name;
    let inputValue = e.target.value;

    setFormData((prevData) => {
      return { ...prevData, [inputName]: inputValue };
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Join to start messaging</p>
        <form onSubmit={handleSignup} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Choose a username"
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="confirmPw">Confirm password</label>
            <input
              id="confirmPw"
              type="password"
              name="confirmPw"
              placeholder="Repeat your password"
              onChange={handleChange}
            />
            {formData.confirmPw && formData.password !== formData.confirmPw && (
              <p className={styles.pwMismatch}>Passwords do not match yet…</p>
            )}
          </div>
          <button type="submit" className={styles.submitBtn}>Create account</button>
          {error && <div className={styles.errorMsg}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
