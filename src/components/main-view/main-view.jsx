import React from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

class MainView extends React.Component {
  /**
   * It creates a state object that contains an array of movies and a selected movie.
   */
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "The Shawshank Redemption",
          Description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          ImagePath: "",
        },
        {
          _id: 2,
          Title: "The Godfather",
          Description:
            "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
          ImagePath: "",
        },
        {
          _id: 3,
          Title: "The Dark Knight",
          Description:
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          ImagePath: "",
        },
      ],
      selectedMovie: null,
    };
  }

  /**
   * It sets the state of the selectedMovie property to the newSelectedMovie parameter.
   * @param newSelectedMovie - The movie that was just selected.
   */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

/**
 * It renders the main view of the application.
 * @returns The main view is being returned. If a movie is selected, then the movie view is returned.
 * Otherwise, the list of movies is returned.
 */
  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}

export default MainView;
