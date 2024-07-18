using Microsoft.EntityFrameworkCore;
using NewsProject.Repository.Entities;
using NewsProject.Repository.Interfaces;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProject.Repository.Repository
{
    public class AdRepository : IAd
    {
        private readonly IContext _context;
        public AdRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Ad> AddItem(Ad item)
        {
            await _context.Ads.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Ads.Remove(_context.Ads.FirstOrDefault(x => x.Id == id));
            await _context.SaveChanges();
        }

        public async Task<Ad> get(int id)
        {
            return await _context.Ads.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Ad>> getAllAsync()
        {
            return await _context.Ads.ToListAsync();
        }

        public async Task<List<Ad>> GetByCaregory(int category)
        {
          return await _context.Ads.Where(x=>x.Caterory.Id == category).ToListAsync();
        }

        public async Task<List<Ad>> GetByUser(string id)
        {
          return await _context.Ads.Where(x=>x.User.Id == id).ToListAsync();
  
        }

        public async Task UpdateItem(Ad item, int id)
        {
            Ad a = _context.Ads.FirstOrDefault(x => x.Id == id);
            if (a != null)
            {
                a.Title = item.Title;
                a.Caterory = item.Caterory;
                a.CategoryId = item.CategoryId;
                a.Content = item.Content;
                await _context.SaveChanges();
            }
        }
    }
}
