using AutoMapper;
using NewsProject.Common.Entities;
using NewsProject.Repository.Entities;
using NewsProject.Repository.Interfaces;
using NewsProject.Service.Interfaces;
using Repository.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProject.Service.Services
{
    public class UserService : ILoginService
    {
        private readonly ILogin<User> repository;
        private readonly IMapper mapper;
        public UserService(ILogin<User> repository, IMapper _mapper)
        {
            this.repository = repository;
            this.mapper = _mapper;
        }


        public async Task<UserDto> AddItem(UserDto item)
        {
            return mapper.Map<UserDto>(await repository.AddItem(mapper.Map<User>(item)));
        }

        public async Task DeleteById(string id)
        {
            await repository.DeleteById(id);
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<UserDto>> GetAll()
        {            
            return mapper.Map<List<UserDto>>(await repository.getAllAsync());
        }

        public async Task<UserDto> GetById(int id)
        {
            return mapper.Map<UserDto>(await repository.get(id));
        }

        public UserDto Login(string email, string pass)
        {
            return mapper.Map<UserDto>(repository.Login(email, pass));
        }

        public void UpdateItem(UserDto item, int id)
        {
            repository.UpdateItem(mapper.Map<User>(item), id);
        }
    }
}
