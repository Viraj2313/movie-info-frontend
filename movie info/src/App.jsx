import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import AboutMovie from "./components/AboutMovie";
import Login from "./components/Login";
import WishList from "./components/WishList";
import axios from "axios";
function App() {
  const navigate = useNavigate();
  const [user, setUserName] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Session User Id:", sessionStorage.getItem("User Id"));
        const response = await axios.get("http://localhost:5006/api/user", {
          withCredentials: true,
        });
        if (response.data.userName) {
          setUserName(response.data.userName);
        }
      } catch (error) {
        console.log("Error fetching user name");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5006/api/logout",
        {},
        { withCredentials: true }
      );

      console.log(response.data.message);

      setUserName(null);
      navigate("/");
    } catch (error) {
      console.log("logout failed", error.response?.data || error.message);
    }
  };
  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/wishlist" element={<WishList />}></Route>
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
