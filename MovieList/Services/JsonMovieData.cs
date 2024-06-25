using MovieList.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace MovieList.Services
{
    public class JsonMovieData
    {
        private readonly string _jsonFilePath;

        public JsonMovieData(IConfiguration configuration)
        {
            _jsonFilePath = configuration["JsonFilePath"];
        }
        //Retrieves list of movies from the Json file.
        public List<Movie> GetAllMovies()
        {
            using (StreamReader file = File.OpenText(_jsonFilePath))
            {
                JsonSerializer serializer = new JsonSerializer();
                List<Movie> movies = (List<Movie>)serializer.Deserialize(file, typeof(List<Movie>));
                return movies ?? new List<Movie>();
            }
        }
        // Saves  list of movies to the JSON file.
        public void SaveMovies(List<Movie> movies)
        {
            using (StreamWriter file = File.CreateText(_jsonFilePath))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, movies);
            }
        }
    }
}
