using System.ComponentModel.DataAnnotations;

namespace MovieList.Models
{
    public class Movie
    {
        public int Id { get; set; }

        //Title of the movie , Required field.
        [Required]
        public string? Title { get; set; }
        //Genre of the movie , Required field.
        [Required]
        public string? Genre { get; set; }

        [Range(1, 10)]
        public int Rating { get; set; }
    }
}
