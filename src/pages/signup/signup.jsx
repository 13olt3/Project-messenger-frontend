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
    <>
      {" "}
      <form onSubmit={handleSignup} className={styles.form}>
        <label>username:</label>
        <input type="text" name="username" onChange={handleChange} />
        <label>password:</label>
        <input type="password" name="password" onChange={handleChange} />
        <label>Confirm password:</label>
        <input type="password" name="confirmPw" onChange={handleChange} />
        {formData.confirmPw && formData.password !== formData.confirmPw && (
          <p style={{ color: "red" }}>Passwords do not match yet...</p>
        )}

        <label>email:</label>
        <input type="email" name="email" onChange={handleChange} />
        <button type="submit">Submit</button>
        {error ? <div>{error}</div> : ""}
      </form>
    </>
  );
}

export default Signup;
