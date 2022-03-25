import React from "react";
import "./genre-view.scss";
import PropTypes from "prop-types";
import { Container, Card, Button } from "react-bootstrap";

function GenreView({ genre, onBackClick }) {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Genre</Card.Title>
          <Card.Text>
            <span className="label">Name: </span>
            <span className="value">{genre.Name}</span>
          </Card.Text>
          <Card.Text>
            <span className="label">Description: </span>
            <span className="value">{genre.Description}</span>
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

GenreView.proptypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};

export default GenreView;
