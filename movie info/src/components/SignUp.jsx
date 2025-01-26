import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/SignUp.css";
const SignUp = ({ setUserName }) => {
  const [user, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5006/api/register",
        user
      );
      if (response.status == 200) {
        setUserName({ name: user.name });
        sessionStorage.setItem("User Id", response.data.userId);
        localStorage.setItem("user", JSON.stringify({ name: user.name }));

        setUserState({
          name: "",
          email: "",
          password: "",
        });
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>SignUp</div>
      <form onSubmit={handleSubmit} className="signUpForm">
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={(e) => setUserState({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => setUserState({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => setUserState({ ...user, password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;
