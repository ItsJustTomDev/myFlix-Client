import React from "react";
import "./genre-view.scss";
import PropTypes from "prop-types";
import { Container, Card, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

function GenreView({ movie }) {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Genre</Card.Title>
          <Card.Text>
            <span className="label">Name: </span>
            <span className="value">{movie.Genre.Name}</span>
            {console.log(movie)}
          </Card.Text>
          <Card.Text>
            <span className="label">Description: </span>
            <span className="value">{movie.Genre.Description}</span>
          </Card.Text>

          <Link to="/">
            <Button variant="primary">Back</Button>
          </Link>
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

export default connect(mapStateToProps)(GenreView);
