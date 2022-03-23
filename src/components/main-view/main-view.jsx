import React, { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import RegistrationView from "../registration-view/registration-view";
import axios from "axios";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://secret-mesa-82091.herokuapp.com/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!user) return <LoginView onLoggedIn={(user) => setUser(user)} />;

  if (movies.length === 0)
    return <div className="main-view">The list is empty!</div>;

  return (
    <div className="main-view">
      {selectedMovie ? (
        <MovieView
          movie={selectedMovie}
          onBackClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(movie) => {
              setSelectedMovie(movie);
            }}
          />
        ))
      )}
    </div>
  );
};

export default MainView;
