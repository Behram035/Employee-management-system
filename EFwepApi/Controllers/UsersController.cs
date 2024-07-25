using EFwepApi.Data;
using EFwepApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace EFwepApi.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Context dbContext;
        private readonly IConfiguration configuration;
        public UsersController(Context dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
        }
        [HttpPost]
        public async Task<IActionResult> Registration(UserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var checkEmail = await dbContext.Users.FirstOrDefaultAsync(x  => x.Email == model.Email);
            if (checkEmail == null)
            {
                var addUser = new User
            {
                Id = Guid.NewGuid(),
                UserName = model.UserName,
                Email = model.Email,
                Password = model.Password,
                CreatedAt = DateTime.Now,
            };
            await dbContext.Users.AddAsync(addUser);
            await dbContext.SaveChangesAsync();
            
            return Ok("User registered Successfully");
            }
            else
            {
                return BadRequest("User already registered with this Email.");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == loginModel.Email && x.Password == loginModel.Password);
            if (user != null)
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("Id", user.Id.ToString()),
                    new Claim("Email", user.Email.ToString()),
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:key"]));
                var SignIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    configuration["Jwt:Issuer"],
                    configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(180),
                    signingCredentials: SignIn
                    );
                string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new { Token = tokenValue, User = user });
                // return Ok(user);
            }
            return NoContent();
        }
        // [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var allUsers = await dbContext.Users.ToListAsync();
            return Ok(allUsers);
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePassword(UpdatePassword userPassword)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == userPassword.Email);
            if (user is not null)
            {
                user.Password = userPassword.Password;

                await dbContext.SaveChangesAsync();
                return Ok(user);
            }
            return NotFound("Email not Found");
        }

        // [Authorize]
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var getUser = await dbContext.Users.FindAsync(id);
            if (getUser != null)
            {
                return Ok(getUser);
            }
            else
            {
                return NotFound("User Not found");
            }
        }
    }
}
