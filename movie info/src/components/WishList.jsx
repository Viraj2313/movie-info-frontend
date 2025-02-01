import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Home.css";

const WishList = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:5006/api/wishlist", {
          withCredentials: true,
        });
        setWishlist(response.data);
        console.log(wishlist);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getWishlist();
  }, []);
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Error: {error}</>;
  }
  return (
    <>
      <div>WishList</div>
      <ul className="movieList">
        {wishlist ? (
          wishlist.map((item) => (
            <li key={item.id}>
              <img src={item.moviePoster}></img>
              <h3>{item.movieTitle}</h3>
            </li>
          ))
        ) : (
          <p>No movies in wishlist</p>
        )}
      </ul>
    </>
  );
};

export default WishList;
