import React, { useState } from "react";
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

function RegistrationView() {
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regBirthday, setRegBirthday] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;

    if (!regUsername) {
      setUsernameErr("Username required");
      isReq = false;
    } else if (regUsername.length < 2) {
      setUsernameErr("Username must be at least 2 characters long");
      isReq = false;
    }
    if (!regPassword) {
      setPasswordErr("Password required");
      isReq = false;
    } else if (regPassword.length < 6) {
      setPasswordErr("Password must be at least 6 characters long");
      isReq = false;
    }
    if (!regEmail) {
      setEmailErr("Email required");
      isReq = false;
    } else if (regEmail.indexOf("@") === -1) {
      setRegEmail("Email must be valid");
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
          Username: regUsername,
          Password: regPassword,
          Email: regEmail,
          Birthday: regBirthday,
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
                      onChange={(e) => setRegUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      placeholder="Enter a password"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email Adress:</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      placeholder="Enter a Email"
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      onChange={(e) => setRegBirthday(e.target.value)}
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
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func,
};

export default RegistrationView;
