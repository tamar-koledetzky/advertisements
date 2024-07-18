using NewsProject.Repository.Entities;
using NewsProject.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface ILogin<T> : IRepository<User>
    {
        User Login(string email, string password);
        Task DeleteById(string id);
    }
}
