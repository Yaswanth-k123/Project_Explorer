import "./Login.css";
import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Updated ID1:", props.id);
 },[props.id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", { email, password })
      .then((result) => {
        console.log(result);
        const { data } = result;
        if (data.message === "Success") {
          // If login is successful, set the user ID in the state
          console.log("id1=");
          props.setId(data.userId);
          console.log(props.id)
          navigate("/home");
        } else {
          // Handle login failure (e.g., show error message)
          console.log("Login failed:", data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">DevPortFolio</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Email"
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="loginButton" onClick={handleSubmit}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>

            <p class="join-link">
              Create a New Account
              <a href="/register" class="join-now">
                login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
