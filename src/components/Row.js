import React, { useState, useEffect } from "react";
import axios from "../axios";

import "./Row.css";

const basePosterUrl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(fetchUrl);
      setMovies(res.data.results);
    };
    fetchMovies();
  }, [fetchUrl]);
  //   console.log(movies);

  return (
    <main>
      <h3> {title} </h3>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__poster-large"}`}
            src={`${basePosterUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </main>
  );
};

export default Row;
