using Microsoft.AspNetCore.Mvc;
using NewsProject.Common.Entities;
using NewsProject.Repository.Entities;
using NewsProject.Repository.Interfaces;
using NewsProject.Service.Interfaces;
using NewsProject.Service.Services;

namespace NewsProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IRepository<Category> repositoryCategory;
        public CategoryController(IRepository<Category> repositoryCategory)
        {
            this.repositoryCategory = repositoryCategory;
        }
        [HttpGet]
        public Task<List<Category>> Get()
        {
            return repositoryCategory.getAllAsync();
        }
    }
}
