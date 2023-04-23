// import React, { useState } from "react";
// import Login from "./Login";

// const Register = () => {
//   const [showLogin, setShowLogin] = useState(false);

//   const handleLoginClick = () => {
//     setShowLogin(true);
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       {showLogin ? (
//         <Login />
//       ) : (
//         <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//               Username
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="username"
//               type="text"
//               placeholder="Username"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="email"
//               type="email"
//               placeholder="Email"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               placeholder="Password"
//             />
//           </div>
//           <div className="flex items-center justify-center mb-6">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Register
//             </button>
//           </div>
//           <div className="flex items-center justify-center">
//             <p className="text-gray-700 text-sm">Already have an account? <button className="text-blue-500 font-bold" onClick={handleLoginClick}>Login here</button></p>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Register;
//is sucsess sucsess component
//display err msg

import React, { useState } from "react";
import Login from "./Login";
import { useCreateUserMutation } from "state/api";

import axios from "api/axios";
// import { json } from "react-router-dom";
const REGISTER_URL = "user/createUser";

const Register = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sucsess, setSucsess] = useState(false);
  // const [errMsg, setErrMsg] = useState("");

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

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);

    // Email validation regex pattern
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

    if (!emailPattern.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };
  // const [addUser] = useCreateUserMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // بل اساس مفينو يضغط
    if (
      !name ||
      !email ||
      !password ||
      nameError ||
      passwordError ||
      emailError
    ) {
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, password, email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setEmail("");
      setName("");
      setPassword("");
      //clear state and controlled inputs
      //need value attrib on inputs for this
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
        console.log(errMsg);
        console.log(err.response);
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    // <>
    // {success ? (
    //     <section>
    //         <h1>Success!</h1>
    //         <p>
    //react router
    //             <a href="#">Sign In</a>
    //         </p>
    //     </section>
    // ) : (

    <div className="flex items-center justify-center h-screen">
      {showLogin ? (
        <Login />
      ) : (
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && name && (
              <p className="text-red-500 text-xs italic">{nameError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && email && (
              <p className="text-red-500 text-xs italic">{emailError}</p>
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
                !name ||
                !email ||
                !password ||
                nameError ||
                passwordError ||
                emailError
                  ? true
                  : false
              }
              // disabled={true}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-gray-700 text-sm">
              Already have an account? {/* we should put react router */}
              <button className="text-blue-500 font-bold">Login here</button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
