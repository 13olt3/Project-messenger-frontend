import { loginUser } from "../../services/userService.js";
import { useOutletContext, useNavigate, Link } from "react-router";
import { useState } from "react";
import styles from "./Login.module.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { handleLoginUsername } = useOutletContext();
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();

    const username = formData.username;
    const password = formData.password;

    const data = await loginUser(username, password);
    handleLoginUsername(username);
    localStorage.setItem("jwtToken", data.token);
    localStorage.setItem("username", username);

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
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your account to continue</p>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.submitBtn}>Sign in</button>
        </form>
        <div className={styles.footer}>
          No account?{" "}
          <Link to="/signup">Create one now</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
