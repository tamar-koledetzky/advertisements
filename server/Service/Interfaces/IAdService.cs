using NewsProject.Common.Entities;
using NewsProject.Repository.Entities;
using NewsProject.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IAdService:IService<AdDto>
    {
        public Task<List<AdDto>> GetByUser(string id);
        public Task<List<AdDto>> GetByCategory(int category);
    }
}
