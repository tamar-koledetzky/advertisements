using Microsoft.EntityFrameworkCore;
using NewsProject.Repository.Entities;
using NewsProject.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class WordCategoryRepository:IRepository<WordCategory>
    {
        private readonly IContext _context;
        public WordCategoryRepository(IContext context)
        {
            _context = context;
        }
        public async Task<WordCategory> AddItem(WordCategory item)
        {
            await _context.WordsCategories.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.WordsCategories.Remove(_context.WordsCategories.FirstOrDefault(x => x.Id == id));
            await _context.SaveChanges();
        }

        public async Task<WordCategory> get(int id)
        {
            return await _context.WordsCategories.FirstOrDefaultAsync(x => x.Id==id);
        }
      
        public async Task<List<WordCategory>> getAllAsync()
        {
            return await _context.WordsCategories.ToListAsync();
        }

        public async Task UpdateItem(WordCategory item, int id)
        {
            WordCategory u = _context.WordsCategories.FirstOrDefault(x => x.Id == id);
            if (u!=null)
            {
                u.Weight=item.Weight;
            }
             await _context.SaveChanges();
        }


    }
}
