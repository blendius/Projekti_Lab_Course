
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class PrindAccountController : ControllerBase
    {
        private readonly UserManager<Prindi> _userManager;
        private readonly SignInManager<Prindi> _signInManager;
        private readonly TokenService _tokenService;
        public PrindAccountController(UserManager<Prindi> userManager, SignInManager<Prindi> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("loginPrindi")]

        public async Task<ActionResult<PrindDto>> Login(LoginDto loginDto)
        {
            var prindi = await _userManager.FindByEmailAsync(loginDto.Email);

            if (prindi == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(prindi, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreatePrindObject(prindi);
            }
            return Unauthorized();
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<PrindDto>> GetCurrentPrind()
        {
            var prindi = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreatePrindObject(prindi);
        }

        private PrindDto CreatePrindObject(Prindi prindi)
        {
            return new PrindDto
            {
                Id=prindi.Id,
                DisplayName = prindi.DisplayName,
                Image = null,
                Token = _tokenService.CreateTokenPrind(prindi),
                UserName = prindi.UserName,
                Email = prindi.Email,
                DataLindjes = prindi.DataLindjes,
                PhoneNumber = prindi.PhoneNumber
            };
        }

        [HttpPost("registerPrind")]

        public async Task<ActionResult<PrindDto>> RegisterPrind(RegisterPrindDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email e zene!");
            }

            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                return BadRequest("Username i zene!");
            }

            var prind = new Prindi
            {
                DisplayName = registerDto.DisplayName,
                // Token = _tokenService.CreateTokenPrind(prindi),
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                DataLindjes = registerDto.DataLindjes,
                PhoneNumber = registerDto.PhoneNumber
               
            };

            var result = await _userManager.CreateAsync(prind, registerDto.Password);

            if (result.Succeeded){
                return CreatePrindObject(prind);
            }

            return BadRequest("Problem gjate regjistrimit te prindit!");
        }
    }
}