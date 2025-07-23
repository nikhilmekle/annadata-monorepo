import React, { useContext, useEffect } from "react";
import "./LoginPopup.css";
import { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;
    let payload = data;
    if (currState === "Login") {
      newUrl += "/api/user/login";
      payload = {
        email: data.email,
        password: data.password,
      };
    } else {
      newUrl += "/api/user/register";
      payload = data;
    }

    const response = await axios.post(newUrl, payload);
    if (response.data.success) {
      toast.success(response.data.message);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? (
            <></>
          ) : (
            <>
              <input
                type="text"
                placeholder="Your Name"
                required
                name="name"
                value={data.name}
                onChange={onChangeHandler}
              />
            </>
          )}
          <input
            type="text"
            placeholder="Your Email"
            required
            name="email"
            value={data.email}
            onChange={onChangeHandler}
          />
          <input
            type="text"
            placeholder="Password"
            required
            name="password"
            value={data.password}
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing , igree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <>
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          </>
        ) : (
          <>
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
