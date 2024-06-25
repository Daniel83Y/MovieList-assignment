using MovieList.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace MovieList.Services
{
    public class MovieService
    {
        private readonly string _jsonFilePath;

        public MovieService(IConfiguration configuration)
        {
            _jsonFilePath = configuration["JsonFilePath"]!;
            if (string.IsNullOrEmpty(_jsonFilePath))
            {
                throw new ArgumentException("JsonFilePath is not configured.");
            }
        }
        // Retrieves list of movies from the JSON file.
        public List<Movie> GetMovies()
        {
            if (!File.Exists(_jsonFilePath))
            {
                return new List<Movie>();
            }

            using (StreamReader file = new StreamReader(_jsonFilePath))
            {
                var json = file.ReadToEnd();
                var movies = JsonSerializer.Deserialize<List<Movie>>(json);
                return movies ?? new List<Movie>();
            }
        }
        // Adds a new movie to the list and saves it to the JSON file.
        public Movie AddMovie(Movie newMovie)
        {
            List<Movie> movies = GetMovies();
            newMovie.Id = movies.Count > 0 ? movies.Max(m => m.Id) + 1 : 1;
            movies.Add(newMovie);
            SaveMovies(movies);
            return newMovie;
        }
        //Edit existing movie in the list and saves the changes to the JSON file.
        public void EditMovie(Movie movie)
        {
            List<Movie> movies = GetMovies();
            var existingMovie = movies.FirstOrDefault(m => m.Id == movie.Id);
            if (existingMovie != null)
            {
                existingMovie.Title = movie.Title;
                existingMovie.Genre = movie.Genre;
                existingMovie.Rating = movie.Rating;
                SaveMovies(movies);
            }
        }
        // Deletes a movie from the list and saves the changes to the JSON file.
        public void DeleteMovie(int id)
        {
            List<Movie> movies = GetMovies();
            var movie = movies.FirstOrDefault(m => m.Id == id);
            if (movie != null)
            {
                movies.Remove(movie);
                SaveMovies(movies);
            }
        }
        //Saves the list of movies to the JSON file.
        private void SaveMovies(List<Movie> movies)
        {
            using (StreamWriter file = new StreamWriter(_jsonFilePath))
            {
                var json = JsonSerializer.Serialize(movies, new JsonSerializerOptions { WriteIndented = true });
                file.Write(json);
            }
        }
    }
}
