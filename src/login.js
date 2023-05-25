import React from "react";
import { useState } from "react";
import "./CSS/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
        ></input>
        <button type="submit">Log In</button>
      </form>
      <a>Register</a>
    </>
  );
};
export default Login;
