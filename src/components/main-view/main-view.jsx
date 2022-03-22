import React, { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

const MainView = () => {
    const [movies, setMovies] = useState([
        {
            _id: 1,
            Title: "The Shawshank Redemption",
            Description:
                "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            ImagePath: "https://via.placeholder.com/50x50",
        },
        {
            _id: 2,
            Title: "The Godfather",
            Description:
                "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
            ImagePath: "https://via.placeholder.com/50x50",
        },
        {
            _id: 3,
            Title: "The Dark Knight",
            Description:
                "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            ImagePath: "https://via.placeholder.com/50x50",
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (movies.length === 0)
        return <div className="main-view">The list is empty!</div>;

    return (
        <div className="main-view">
            {selectedMovie ? (
                <MovieView
                    movie={selectedMovie}
                    onBackClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ) : (
                movies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        onMovieClick={(movie) => {
                            setSelectedMovie(movie);
                        }}
                    />
                ))
            )}
        </div>
    );
};

export default MainView;
