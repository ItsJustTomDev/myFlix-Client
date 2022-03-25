import React from "react";
import "./director-view.scss";
import { Container, Card, Button } from "react-bootstrap";

function DirectorView({ director, onBackClick }) {
  return (
    <Container fluid>
      <Card>
        <Card.Body>
          <Card.Title>Director</Card.Title>
          <Card.Text>
            <span className="label">Name: </span>
            <span className="value">{director.Name}</span>
          </Card.Text>
          <Card.Text>
            <span className="label">Bio: </span>
            <span className="value">{director.Bio}</span>
          </Card.Text>

          <Button
            variant="primary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DirectorView;
