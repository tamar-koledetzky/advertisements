using Microsoft.EntityFrameworkCore;
using NewsProject.Repository.Entities;
using NewsProject.Repository.Interfaces;

namespace NewsProject.MockContext
{
    public class MyDataContext : DbContext, IContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Ad> Ads { get; set; }
        public DbSet<Word> Words { get ; set ; }
        public DbSet<WordCategory> WordsCategory { get ; set; }
        public DbSet<WordCategory> WordsCategories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=(localdb)\\MSSQLLocalDB;database=NewsProject;trusted_connection=true");
        }
        public async Task SaveChanges()
        {
            await SaveChangesAsync();
        }
    }
}