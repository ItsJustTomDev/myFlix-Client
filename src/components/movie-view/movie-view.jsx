import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

import "./movie-view.scss";

const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <div className="movie-poster">
        <img src={movie.ImagePath} />
      </div>
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.Title}</span>
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movie.Description}</span>
      </div>
      <Button
        onClick={() => {
          onBackClick(null);
        }}
      >
        Back
      </Button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthYear: PropTypes.number.isRequired,
    }),
    Actors: PropTypes.array.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieView;
