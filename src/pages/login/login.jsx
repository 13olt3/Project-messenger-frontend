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
    <>
      {" "}
      <form onSubmit={handleLogin} className={styles.form}>
        <label>username:</label>
        <input type="text" name="username" onChange={handleChange} />
        <label>password:</label>
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        No account? Sign up:
        <Link to="/signup">Sign up now.</Link>
      </div>
    </>
  );
}

export default Login;
