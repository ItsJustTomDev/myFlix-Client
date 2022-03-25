import React, { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import RegistrationView from "../registration-view/registration-view";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./main-view.scss";
import { Redirect } from "react-router-dom";
import { NavbarView } from "../navbar-view/navbar-view";
import ProfileView from "../profile-view/profile-view";
import GenreView from "../genre-view/genre-view";
import DirectorView from "../director-view/director-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      setUser(localStorage.getItem("user"));
      getMovies(accessToken);
    }
  }, []);

  const getMovies = (token) => {
    axios
      .get("https://secret-mesa-82091.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onLoggedIn = (authData) => {
    console.log(authData);
    setUser(authData.user.Username);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
  };

  return (
    <Router>
      <NavbarView user={user} />
      <Container>
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user) {
                return <Redirect to="/login" />;
              }

              return (
                <>
                  {movies.map((movie) => (
                    <Col md={3} key={movie._id}>
                      <MovieCard movie={movie} onMovieClick={() => {}} />
                    </Col>
                  ))}
                </>
              );
            }}
          />
          <Route
            path="/login"
            render={() => {
              if (user) {
                return <Redirect to="/" />;
              }

              return <LoginView onLoggedIn={(data) => onLoggedIn(data)} />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) {
                return <Redirect to="/" />;
              }

              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => onLoggedIn(user)} />
                  </Col>
                );
              }

              if (movies.length === 0) {
                return <div className="main-view" />;
              }

              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/profile"
            render={({ history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => onLoggedIn(user)} />
                  </Col>
                );
              }

              return (
                <Col md={8}>
                  <ProfileView
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => onLoggedIn(user)} />
                  </Col>
                );
              }

              if (movies.length === 0) {
                return <div className="main-view" />;
              }

              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                    movies={movies.filter(
                      (movie) => movie.Genre.Name === match.params.name
                    )}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => onLoggedIn(user)} />
                  </Col>
                );
              }

              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                    movies={movies.filter(
                      (movie) => movie.Director.Name === match.params.name
                    )}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Container>
    </Router>
  );
};

export default MainView;
