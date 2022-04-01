import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Container, Row } from "react-bootstrap";

import "./movie-view.scss";
import { Link } from "react-router-dom";

const MovieView = ({ movie, onBackClick }) => {
  return (
    <Container fluid className="movie-container">
      <Row>
        <Col>
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
            <div className="movie-genre">
              <span className="label">Genre:</span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </div>
            <div className="movie-director">
              <span className="label">Director:</span>
              <Link to={`/director/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </div>

            <Button variant="primary" onClick={() => onBackClick(null)}>
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
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
    }),
    Actors: PropTypes.array.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieView;
