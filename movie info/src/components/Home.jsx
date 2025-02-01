import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Home.css";
import { Navigate, useNavigate } from "react-router-dom";
const Home = ({ setSelectedMovie }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5006/api/home")
      .then((response) => {
        const movieData = response.data;
        setMovies(movieData.Search);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSave = async (movie) => {
    try {
      const userId = sessionStorage.getItem("User Id");
      console.log(userId);
      if (!userId) {
        alert("login first");
        return;
      }

      const moviesToSave = {
        userId: userId,
        movieTitle: movie.Title,
        movieId: movie.imdbID,
      };
      console.log(moviesToSave);
      const response = await axios.post(
        "http://localhost:5006/api/add_wishlist",
        moviesToSave,
        { withCredentials: true }
      );
      if (response.status == 200) {
        alert("Movie added to Wishlist");
      }
    } catch (error) {
      console.log(error);
      alert(`unable to add to wishlist`, error);
    }
  };
  const handleClick = (movie) => {
    setSelectedMovie(movie.imdbID);
    navigate(`/about/${movie.Title}`);
    console.log(`Clicked on movie with ID: ${movie.imdbID}`);
  };

  return (
    <>
      <ul className="movieList">
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt="" onClick={() => handleClick(movie)} />
            <h3>
              {movie.Title}{" "}
              <button onClick={() => handleSave(movie)}>Save</button>
            </h3>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
