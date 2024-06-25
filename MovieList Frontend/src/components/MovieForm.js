import React from 'react';

const MovieForm = ({ currentMovie, onChange, onSubmit, isEditing }) => (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
  {/* Input field for the movie title */}
    <input 
      type="text" 
      name="title" 
      placeholder="Title" 
      value={currentMovie.title} 
      onChange={onChange} 
      required 
    />
     {/* Dropdown for selecting the movie genre */}
    <select name="genre" value={currentMovie.genre} onChange={onChange} required>
      <option value="" disabled>Select Genre</option>
      <option value="Action">Action</option>
      <option value="Comedy">Comedy</option>
      <option value="Drama">Drama</option>
      <option value="Horror">Horror</option>
      <option value="Romance">Romance</option>
      <option value="Sci-Fi">Sci-Fi</option>
      <option value="Thriller">Thriller</option>
      <option value="Fantasy">Fantasy</option>
      <option value="Mystery">Mystery</option>
      <option value="Documentary">Documentary</option>
    </select>
    {/* Dropdown for selecting the movie rating */}
    <select name="rating" value={currentMovie.rating} onChange={onChange} required>
      {[...Array(10).keys()].map(i => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ))}
    </select>
    {/* Submit button for adding or saving a movie */}
    <button type="submit">{isEditing ? 'Save Movie' : 'Add Movie'}</button>
  </form>
);

export default MovieForm;
