using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NewsProject.Common.Entities;
using NewsProject.Service.Algoritim.Interface;
using NewsProject.Service.Interfaces;
using Service.Interfaces;

namespace NewsProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdController : ControllerBase
    {
        private readonly IAlgo algo;
        private readonly IAdService service;

        public AdController(IAlgo algo,IAdService service)
        {
            this.service = service;
            this.algo = algo;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        
        public Task<List<AdDto>> Get()
        {
            return service.GetAll();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public Task<AdDto> Get(int id)
        {
            return service.GetById(id);
        }
        [HttpGet("byCategory/{category}")]
        public Task<List<AdDto>> GetByCategory(int category)
        {
            return service.GetByCategory(category);
        }
        [HttpGet("byUser/{id}")]
        public Task<List<AdDto>> GetByUser(string id)
        {
            return service.GetByUser(id);
        }

        // POST api/<ValuesController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] AdDto ad)
        {
            if (ad == null)
            {
                return NotFound("ad cannt add...");
            }
            await algo.InsertInformationToData(ad.Content, (int)ad.CategoryId);
            ad.Date = DateTime.Now.Date;
            return Ok(await service.AddItem(ad));
        }
        [HttpPost("DefineCategory")]
        //[Authorize]
        public async Task<ActionResult> DefineCategory([FromBody] AdDto ad)
        {
            if (ad == null)
            {
                return NotFound("ad cannt add...");
            }
            return Ok(await algo.DefineCategory(ad.Content,ad.Title));
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] AdDto ad)
        {
            service.UpdateItem(ad, id);
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
