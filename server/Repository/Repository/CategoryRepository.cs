using Microsoft.EntityFrameworkCore;
using NewsProject.Repository.Entities;
using NewsProject.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProject.Repository.Repository
{
    public class CategoryRepository : IRepository<Category>
    {
        private readonly IContext _context;
        public CategoryRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Category> AddItem(Category item)
        {
            await _context.Categories.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Categories.Remove(_context.Categories.FirstOrDefault(x => x.Id== id));
            await _context.SaveChanges();
        }

        public async Task<Category> get(int id)
        {
            return await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Category>> getAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task UpdateItem(Category item, int id)
        {
            Category u = _context.Categories.FirstOrDefault(x => x.Id == id);
            if (u != null)
            {
                u.Name = item.Name;
                await _context.SaveChanges();
            }
        }
    }
}
