using Microsoft.AspNetCore.Mvc;
using MovieList.Services;
using MovieList.Models;
using System.Collections.Generic;

namespace MovieList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MovieService _movieService;

        public MoviesController(MovieService movieService)
        {
            _movieService = movieService;
        }

        // Retrieves all movies from the MovieService and returns them.
        [HttpGet]
        public ActionResult<IEnumerable<Movie>> GetMovies()
        {
            var movies = _movieService.GetMovies();
            return Ok(movies);
        }

        // Adds a new movie to the collection.
        // Validates the movie model and returns the created movie.
        [HttpPost]
        public ActionResult<Movie> AddMovie([FromBody] Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addedMovie = _movieService.AddMovie(movie);
            return CreatedAtAction(nameof(GetMovies), new { id = addedMovie.Id }, addedMovie);
        }

        // Updates an existing movie based on the user-provided id.
        // Validates the id and the movie model before updating.
        [HttpPut("{id}")]
        public IActionResult UpdateMovie(int id, Movie movie)
        {
            if (id != movie.Id)
            {
                return BadRequest();
            }

            _movieService.EditMovie(movie);
            return NoContent();
        }

        // Deletes a movie based on the user-provided id.
        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(int id)
        {
            _movieService.DeleteMovie(id);
            return NoContent();
        }
    }
}
