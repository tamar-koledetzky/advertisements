using Microsoft.EntityFrameworkCore;
using NewsProject.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProject.Repository.Interfaces
{
    public interface IContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Ad> Ads { get; set; }
        public DbSet<Word> Words { get; set; }
        public DbSet<WordCategory> WordsCategories { get; set; }
        public Task SaveChanges();

    }
}
