import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body className="movie-card-body">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="movie-card-description">
          {movie.Description}
        </Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
