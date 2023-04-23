import React, { useState } from "react";
// import AuthContext from "context/AuthProvider";
import useAuth from "hooks/useAuth";
import Register from "./Register";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "api/axios";
const LOGIN_URL = "user/login";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);

    // Validate name field
    if (value.length < 3) {
      setNameError("Name must have at least 3 characters");
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setNameError("Name can only contain letters and numbers");
    } else {
      setNameError("");
    }
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);

    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handlelogin = async (event) => {
    event.preventDefault();
    console.log(from);

    // بل اساس مفينو يضغط
    if (!name || !password || nameError || passwordError) return;

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ name, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response));

      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      setAuth({ name, password });
      // setAuth({ name, password, roles, accessToken });
      setName("");
      setPassword("");
      navigate(from, { replace: true });
      console.log("sucsess");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {showRegister ? (
        <Register />
      ) : (
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handlelogin}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && name && (
              <p className="text-red-500 text-xs italic">{nameError}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && password && (
              <p className="text-red-500 text-xs italic max-w-xs">
                {passwordError}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center mb-6">
            <button
              disabled={
                !name || !password || nameError || passwordError ? true : false
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handlelogin}
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-gray-700 text-sm">
              Don't have an account?{" "}
              <button className="text-blue-500 font-bold">Register here</button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
