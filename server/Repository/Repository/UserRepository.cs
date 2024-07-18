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
    public class UserRepository:ILogin<User>
    {
        private readonly IContext _context;
        public UserRepository(IContext context)
        {
            _context = context;
        }
        public async Task<User> AddItem(User item)
        {
            await _context.Users.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteById(string id)
        {
            _context.Users.Remove(_context.Users.FirstOrDefault(x => x.Id == id));
            await _context.SaveChanges();
        }

        public async Task DeleteItem(int id)
        {
            _context.Users.Remove(_context.Users.FirstOrDefault(x => x.Id == id.ToString()));
            await _context.SaveChanges();
        }

        public async Task<User> get(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id ==id.ToString());
        }

        public async Task<List<User>> getAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public User Login(string email, string password)
        {
           var user=_context.Users.FirstOrDefault(x=>x.Email==email&& x.Password==password);
            if(user!=null)
            {
                return user;
            }
            return null;
        }

        public async Task UpdateItem(User item, int id)
        {
            User u = _context.Users.FirstOrDefault(x => x.Id == id.ToString());
            if (u != null)
            {
                u.Name = item.Name;
                u.Phone = item.Phone;
                u.Email = item.Email;
                u.ads = item.ads;
                u.Password = item.Password;
                await _context.SaveChanges();
            }
        }

    }
}
