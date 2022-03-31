import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import "./profile-view.scss";

function ProfileView({ movies, onBackClick }) {
  const [userUsername, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    fetchUser(accessToken);
  }, []);

  const fetchUser = (token) => {
    const username = localStorage.getItem("user");
    axios
      .get(`https://secret-mesa-82091.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setPassword(response.data.Password);
        setEmail(response.data.Email);
        setBirthday(response.data.Birthday);
        setFavMovies(response.data.FavoriteMovies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://secret-mesa-82091.herokuapp.com/users/${username}`,
        {
          Username: userUsername,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setUsername(response.data.Username);
        setPassword(response.data.Password);
        setEmail(response.data.Email);
        setBirthday(response.data.Birthday);
      })
      .catch((e) => {
        console.log(e);
      });

    localStorage.setItem("user", userUsername);
    alert("Profile updated successfully");
  };

  const RemoveFavoriteMovie = (e, movie) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://secret-mesa-82091.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie removed successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onDeleteUser = () => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://secret-mesa-82091.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile deleted successfully");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container className="profile-view" align="center">
      <Row>
        <Col>
          <Card className="update-profile">
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Form
                className="update-form"
                onSubmit={(e) =>
                  editUser(e, userUsername, password, email, birthday)
                }
              >
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="Username"
                    placeholder="New Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    name="Birthday"
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>
                <div className="mt-3">
                  <Button variant="success" type="submit" onClick={editUser}>
                    Update User
                  </Button>
                  <Button
                    className="ml-3"
                    variant="secondary"
                    onClick={() => onDeleteUser()}
                  >
                    Delete User
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col className="text-white">
          <h4>{userUsername} Favorite Movies</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card.Body>
            {favMovies.length === 0 && (
              <div className="text-center text-white">No Favorite Movies</div>
            )}
            <Row className="favorite-container">
              {favMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id === favMovies.find((fav) => fav === movie._id)
                  ) {
                    return (
                      <Card
                        className="favorite-movie card-content"
                        key={movie._id}
                      >
                        <Card.Img
                          className="fav-poster"
                          variant="top"
                          src={movie.ImagePath}
                        />
                        <Card.Body style={{ backgroundColor: "black" }}>
                          <Card.Title className="movie_title">
                            {movie.Title}
                          </Card.Title>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={(e) => RemoveFavoriteMovie(e, movie)}
                          >
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  }
                })}
            </Row>
          </Card.Body>
        </Col>
      </Row>
      <div className="backButton">
        <Link to="/">
          <Button variant="primary">Back</Button>
        </Link>
      </div>
      <br />
    </Container>
  );
}

export default ProfileView;
