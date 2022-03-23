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

function RegistrationView({ onRegistration }) {
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(regUsername, regPassword);
    onRegistration(regUsername);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
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
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      placeholder="Enter a password"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Email Adress:</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      placeholder="Enter a password"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
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
  onRegistration: PropTypes.func.isRequired,
};

export default RegistrationView;
