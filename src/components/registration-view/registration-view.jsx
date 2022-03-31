import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import PropTypes from "prop-types";
import "./registration-view.scss";
import axios from "axios";
import { Link } from "react-router-dom";

// Redux
import { setUser, validateInput } from "../../actions/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function RegistrationView({ user, setUser, validateInput }) {
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  useEffect(() => {
    setUser({
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: [],
    });
  }, []);

  // validate user inputs
  const validate = () => {
    let isReq = true;

    if (!user.Username) {
      setUsernameErr("Username is required (at least 4 characters).");
      isReq = false;
    } else if (user.Username.length < 4) {
      setUsernameErr("Username must be at least 4 characters long.");
      isReq = false;
    }

    if (!user.Password) {
      setPasswordErr("Password is required (at least 6 characters).");
      isReq = false;
    } else if (user.Password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long.");
      isReq = false;
    }

    if (!user.Email) {
      setEmailErr("Email is required.");
      isReq = false;
    } else if (user.Email.indexOf("@") === -1) {
      setEmailErr("Email is not valid.");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://secret-mesa-82091.herokuapp.com/users", {
          Username: user.Username,
          Password: user.Password,
          Email: user.Email,
          Birthday: user.Birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "_self");
        })
        .catch((e) => {
          console.log("error occured while registering a user.");
          alert("Unable to register");
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup className="register-card-group">
            <Card className="register-card">
              <Card.Body>
                <Card.Title>Registration Page</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        validateInput(e.target.value, "Username")
                      }
                      required
                      placeholder="Enter a username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) =>
                        validateInput(e.target.value, "Password")
                      }
                      required
                      placeholder="Enter a password"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email Adress:</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => validateInput(e.target.value, "Email")}
                      required
                      placeholder="Enter a Email"
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      onChange={(e) =>
                        validateInput(e.target.value, "Birthday")
                      }
                      required
                      placeholder="Enter birthday"
                      type="date"
                    />
                  </Form.Group>
                  <Button
                    className="register-button"
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Link to="/">
                    <Button className="register-button register-left">
                      Already a user?
                    </Button>
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
  setUser: PropTypes.func,
  validateInput: PropTypes.func,
};

export default connect(mapStateToProps, { setUser, validateInput })(
  RegistrationView
);
