using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NewsProject.Common.Entities;
using NewsProject.Service.Interfaces;
using Service.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NewsProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly ILoginService service;
        public UserController(ILoginService service, IConfiguration configuration)
        {
            this.service = service;
            _configuration = configuration;
        }
        // GET: api/<ValuesController>

        [HttpGet]
        //[Authorize]
        public Task<List<UserDto>> Get()
        {
            return service.GetAll();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public Task<UserDto> Get(int id)
        {
            return service.GetById(id);
        }


        [HttpGet("Login/{useremail}/{password}")]
        public IActionResult Login(string useremail, string password)
        {
            var user = service.Login(useremail, password);
            if (user != null)
            {

                var token = Generate(user);
                var response = new
                {
                    user1 = user,
                    token1 = token
                };
            
                return Ok(response);
            }
            return BadRequest("User not found");

        }
        private UserDto GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var UserClaim = identity.Claims;
                return new UserDto()
                {
                    Name = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value,
                    Email = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value,
                    //Role = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value
                    // GivenName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.GivenName)?.Value,
                    //  SurName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Surname)?.Value
                };

            }
            return null;
        }
        private string Generate(UserDto user)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
            new Claim(ClaimTypes.NameIdentifier,user.Name),
            new Claim(ClaimTypes.Email,user.Email),
            new Claim(ClaimTypes.Surname,user.Name),
            //new Claim(ClaimTypes.Role,user.Role),
            new Claim(ClaimTypes.GivenName,user.Name)
            };
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserDto user)
        {
            if (user == null)
            {
                return NotFound("USER cannt add...");
            }
            return Ok(await service.AddItem(user));
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] UserDto user)
        {
            service.UpdateItem(user, id);
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            service.DeleteById(id);
        }
    }
}
