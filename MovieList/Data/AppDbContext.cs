using Microsoft.EntityFrameworkCore;
using MovieList.Models;

namespace MovieList.Data
{
    public class AppDbContext : DbContext
    {
        // Initializes the database context with the specified options.
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        // Represents the Movies table in the database.
        public DbSet<Movie> Movies { get; set; }
    }
}
