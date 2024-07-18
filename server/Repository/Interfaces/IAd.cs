using NewsProject.Repository.Entities;
using NewsProject.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IAd:IRepository<Ad>
    {
        public Task<List<Ad>> GetByCaregory(int category);
        public Task<List<Ad>> GetByUser(string id);

    }
}