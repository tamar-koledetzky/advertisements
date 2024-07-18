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
    public class WordRepository:IRepository<Word>
    {
        private readonly IContext _context;
        public WordRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Word> AddItem(Word item)
        {
            await _context.Words.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Words.Remove(_context.Words.FirstOrDefault(x => x.Id == id));
            await _context.SaveChanges();
        }

        public async Task<Word> get(int id)
        {
            return await _context.Words.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Word>> getAllAsync()
        {
            return await _context.Words.ToListAsync();
        }

        public async Task UpdateItem(Word item, int id)
        {
            Word u = _context.Words.FirstOrDefault(x => x.Id == id);
        }

    }
}
