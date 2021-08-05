import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "./Movie.css";

const Movie = ({ match }) => {
  // todo change poster and alt text for header section
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const fetchMovie = async () => {
      const fetchUrl = `/movie/${match.params.id}?api_key=d7a863e84fa978c1d06301cb7534b7b6&language=en-US`;
      const res = await axios.get(fetchUrl);
      setMovie(res.data);
    };
    fetchMovie();
  }, [match.params.id]);
  console.log(movie);

  return (
    <main
      className="movie"
      style={{
        backgroundImage: `url("${requests.fetchPosterImg}${movie?.backdrop_path}")`,
      }}
    >
      <div className="visuals">
        {/* <img
          className="movie__poster"
          src={`${requests.fetchPosterImg}${movie?.backdrop_path}`}
          alt="adsadad"
        /> */}
        {/* <video src="https://www.youtube.com/watch?v=vQWlgd7hV4A"></video> */}
      </div>
      <div className="text-content">
        <div className="movie__genres">
          {movie.genres &&
            movie.genres.map((genre) => (
              <span key={genre.id} className="movie__genre">
                {genre.name}
              </span>
            ))}
        </div>

        <h1 className="movie__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {movie?.tagline !== "" && <h2>{movie.tagline}</h2>}
        <h3 className="movie__release-date">
          Release Date:
          {movie.status === "Released" ? movie.release_date : "Not Released"}
        </h3>
        <p className="movie__desc">{movie.overview}</p>
        {movie.homepage !== "" && (
          <p className="movie__website">
            Website:
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
              {movie.homepage}
            </a>
          </p>
        )}
      </div>
    </main>
  );
};

export default Movie;
