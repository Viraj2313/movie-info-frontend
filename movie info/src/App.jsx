import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import AboutMovie from "./components/AboutMovie";
import Login from "./components/Login";
function App() {
  const [user, setUserName] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("user");
    setUserName(null);
    Navigate("/");
  };
  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={<Home setSelectedMovie={setSelectedMovie} />}
        />
        <Route path="/signup" element={<SignUp setUserName={setUserName} />} />
        <Route
          path="/about/:movieName"
          element={<AboutMovie selectedMovie={selectedMovie} />}
        />
        <Route path="/login" element={<Login setUserName={setUserName} />} />
      </Routes>
    </>
  );
}

export default App;
