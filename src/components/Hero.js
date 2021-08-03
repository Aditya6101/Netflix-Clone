import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";

import "./Hero.css";

const Hero = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(requests.fetchNetflixOriginals);
      const randomMovie = Math.floor(
        Math.random() * res.data.results.length - 1
      );
      setMovie(res.data.results[randomMovie]);
    };
    fetchMovie();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="hero__content">
        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="hero__ctas">
          <button className="hero__cta">Play</button>
          <button className="hero__cta">My List</button>
        </div>
        <p className="hero__desc">{truncate(movie?.overview, 150)}</p>
      </div>
    </section>
  );
};

export default Hero;
