using NewsProject.Common.Entities;
using NewsProject.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface ILoginService : IService<UserDto>
    {
        UserDto Login(string email, string pass);
        Task DeleteById(string id);
    }
}
