import React from 'react';

const MovieItem = ({ movie, onEdit, onDelete }) => {
  return (
    <li>
      <div className="movie-info">
        <div className="movie-title">{movie.title}</div>
        <div className="movie-genre">{movie.genre}</div>
        <div className="movie-rating">(Rating: {movie.rating})</div>
      </div>
      <div>
        <button onClick={() => onEdit(movie)}>Edit</button>
        <button onClick={() => onDelete(movie.id)}>Delete</button>
      </div>
    </li>
  );
};

export default MovieItem;
