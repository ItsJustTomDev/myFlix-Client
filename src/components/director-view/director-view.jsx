import React from "react";
import "./director-view.scss";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function DirectorView({ director, onBackClick }) {
  return (
    <Container fluid>
      <Card>
        <Card.Body>
          <Card.Title>Director</Card.Title>
          <Card.Text>
            <span className="label">Name: </span>
            <span className="value">{director.Director.Name}</span>
          </Card.Text>
          <Card.Text>
            <span className="label">Bio: </span>
            <span className="value">{director.Director.Bio}</span>
          </Card.Text>

          <Link to="/">
            <Button variant="primary">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DirectorView;
