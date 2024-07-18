using AutoMapper;
using NewsProject.Common.Entities;
using NewsProject.Repository.Entities;
using NewsProject.Repository.Interfaces;
using NewsProject.Service.Interfaces;
using NewsProject.Service.Algoritim.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.Interfaces;
using Service.Interfaces;

namespace NewsProject.Service.Services
{
    public class AdService :IAdService
    {
        private readonly IAd repository;
        private readonly IMapper mapper;

        public AdService(IAd repository, IMapper _mapper, IRepository<Category> repositoryCategory, IRepository<WordCategory> repositoryWordCategory,IRepository<Word> repositoryWord)
        {
            this.repository = repository;
            this.mapper = _mapper;
        }

        public async Task<AdDto> AddItem(AdDto item)
        {
            return mapper.Map<AdDto>(await repository.AddItem(mapper.Map<Ad>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<AdDto>> GetAll()
        {
            return mapper.Map<List<AdDto>>(await repository.getAllAsync());
        }

        public async Task<AdDto> GetById(int id)
        {
            return mapper.Map<AdDto>(await repository.get(id));
        }

        public void UpdateItem(AdDto item, int id)
        {
            repository.UpdateItem(mapper.Map<Ad>(item), id);
        }

        public async Task<List<AdDto>> GetByCategory(int category)
        {
            return mapper.Map<List<AdDto>>(await repository.GetByCaregory(category));
        }

        public async Task<List<AdDto>> GetByUser(string id)
        {
            return mapper.Map<List<AdDto>>(await repository.GetByUser(id));
        }
    }
}
