import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieList.css';
import MovieForm from './MovieForm';
import MovieItem from './MovieItem';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({ id: null, title: '', genre: '', rating: '1' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load movies from the API when the component first renders
  useEffect(() => {
    console.log('API URL:', process.env.REACT_APP_API_URL);
    axios.get(`${process.env.REACT_APP_API_URL}/api/movies`)
      .then(response => {
        const sortedMovies = response.data.sort((a, b) => b.rating - a.rating);
        setMovies(sortedMovies);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  // Handle input change for the movie form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentMovie(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Add a new movie
  const handleAddMovie = async () => {
    if (currentMovie.genre === '') {
      alert("Please select a valid genre.");
      return;
    }
    if (movies.some(movie => movie.title.toLowerCase() === currentMovie.title.toLowerCase())) {
      alert("Movie with the same title already exists.");
      return;
    }
    try {
      const movieToAdd = {
        title: currentMovie.title,
        genre: currentMovie.genre,
        rating: parseInt(currentMovie.rating, 10)
      };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/movies`, movieToAdd);
      const sortedMovies = [...movies, response.data].sort((a, b) => b.rating - a.rating);
      setMovies(sortedMovies);
      setCurrentMovie({ id: null, title: '', genre: '', rating: '1' });
    } catch (error) {
      console.error("There was an error adding the movie:", error.response.data);
      if (error.response && error.response.data && error.response.data.errors) {
        console.error("Validation errors:", error.response.data.errors);
      }
    }
  };

  // Set the movie to be edited
  const handleEditMovie = (movie) => {
    setIsEditing(true);
    setCurrentMovie(movie);
  };

  // Save the changes to the movie being edited
  const handleSaveMovie = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/movies/${currentMovie.id}`, currentMovie);
      const updatedMovies = movies.map(movie => movie.id === currentMovie.id ? currentMovie : movie);
      const sortedMovies = updatedMovies.sort((a, b) => b.rating - a.rating);
      setMovies(sortedMovies);
      setCurrentMovie({ id: null, title: '', genre: '', rating: '1' });
      setIsEditing(false);
    } catch (error) {
      console.error("There was an error saving the movie:", error);
    }
  };

  // Remove a movie from the list
  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/movies/${id}`);
      const sortedMovies = movies.filter(movie => movie.id !== id).sort((a, b) => b.rating - a.rating);
      setMovies(sortedMovies);
    } catch (error) {
      console.error("There was an error deleting the movie:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map(movie => (
          <MovieItem key={movie.id} movie={movie} onEdit={handleEditMovie} onDelete={handleDeleteMovie} />
        ))}
      </ul>
      <h2>{isEditing ? 'Edit Movie' : 'Add New Movie'}</h2>
      <MovieForm
        currentMovie={currentMovie}
        onChange={handleInputChange}
        onSubmit={isEditing ? handleSaveMovie : handleAddMovie}
        isEditing={isEditing}
      />
    </div>
  );
};

export default MovieList;
