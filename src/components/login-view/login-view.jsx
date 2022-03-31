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
import axios from "axios";
import PropTypes from "prop-types";
import "./login-view.scss";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { setUser, validateInput } from "../../actions/actions";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function LoginView({ user, setUser, validateInput, onLoggedIn }) {
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [globalErr, setGlobalErr] = useState("");

  useEffect(() => {
    setUser({ Username: "", Password: "" });
  }, []);

  // validate user inputs
  const validate = () => {
    let isValid = true;
    if (!user.Username) {
      setUsernameErr("Username is required.");
      isValid = false;
    }
    if (!user.Password) {
      setPasswordErr("Password is required.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://secret-mesa-82091.herokuapp.com/login", {
          Username: user.Username,
          Password: user.Password,
        })
        .then((response) => {
          const data = response.data;
          onLoggedIn(data);
          window.open("/", "_self");
        })
        .catch((e) => {
          setGlobalErr("No user has been found");
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup className="login-card-group">
            <Card className="login-card">
              <Card.Body>
                <Card.Title>Login Page</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    {globalErr && <p>{globalErr}</p>}
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
                  <Button
                    className="login-button"
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Link to="/register">
                    <Button className="login-button left">Register Now</Button>
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

LoginView.propTypes = {
  onLoggedIn: PropTypes.func,
  validateInput: PropTypes.func,
  setUser: PropTypes.func,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
};

export default connect(mapStateToProps, { setUser, validateInput })(LoginView);
