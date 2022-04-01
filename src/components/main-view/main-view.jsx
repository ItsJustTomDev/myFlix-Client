import React, { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import RegistrationView from "../registration-view/registration-view";
import axios from "axios";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./main-view.scss";
import { Redirect } from "react-router-dom";
import { NavbarView } from "../navbar-view/navbar-view";
import ProfileView from "../profile-view/profile-view";
import GenreView from "../genre-view/genre-view";
import DirectorView from "../director-view/director-view";

import { connect } from "react-redux";
import { setUser } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";

let mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const MainView = ({ user }) => {
  const [movies, setMovies] = useState([]);

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
    let userData = {
      ...authData.user,
      Birthday: authData.user.Birthday.substring(0, 10),
    };
    setUser(userData);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    getMovies(authData.token);
  };

  let localUser = localStorage.getItem("user");

  return (
    <Router>
      <NavbarView />
      <Container>
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!localUser)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => onLoggedIn(user)} />;
                  </Col>
                );

              return <MoviesList movies={movies} />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (localUser) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            exact
            path={`/user`}
            render={() => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => onLoggedIn(user)} />;
                  </Col>
                );
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find(
                      (movie) => movie._id === match.params.movieId
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/director/:id"
            render={({ match }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => onLoggedIn(user)} />;
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={movies.find(
                      (movie) => movie.Director.Name === match.params.id
                    )}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/genres/:id"
            render={({ match }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => onLoggedIn(user)} />;
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    movie={movies.find(
                      (movies) => movies.Genre.Name === match.params.id
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

export default connect(mapStateToProps, { setUser })(MainView);
