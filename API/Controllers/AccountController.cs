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
    public class AccountController : ControllerBase
    {//no mediator
        private readonly UserManager<AppAdmin> _userManager;
        private readonly UserManager<Profesori> _userManagerProf;
        private readonly SignInManager<AppAdmin> _signInManager;
        private readonly SignInManager<Profesori> _signInManagerProf;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppAdmin> userManager, UserManager<Profesori> userManagerProf, SignInManager<AppAdmin> signInManager, SignInManager<Profesori> signInManagerProf, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _userManagerProf = userManagerProf;
            _signInManagerProf = signInManagerProf;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AdminDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        }

        [HttpPost("loginProf")]
        public async Task<ActionResult<ProfDto>> LoginProf(LoginDto loginDto)
        {
            var prof = await _userManagerProf.FindByEmailAsync(loginDto.Email);

            if (prof == null) return Unauthorized();

            var resultProf = await _signInManagerProf.CheckPasswordSignInAsync(prof, loginDto.Password, false);

            if (resultProf.Succeeded)
            {
                return CreateProfObject(prof);
            }
            return Unauthorized();

        }
        [HttpPost("registerProf")]
        public async Task<ActionResult<ProfDto>> RegisterProf(RegisterDto registerDto)
        {
            if (await _userManagerProf.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email taken");
            }
            if (await _userManagerProf.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                return BadRequest("Username taken");
            }
            var prof = new Profesori
            {
                Name = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username,
                GradaAkademike=registerDto.GradaAkademike,
                DataRegjistrimit=registerDto.DataRegjistrimit
            };

            var result = await _userManagerProf.CreateAsync(prof, registerDto.Password);

            if (result.Succeeded)
            {
                 return CreateProfObject(prof);
            }
            return BadRequest("Problem registering professor");
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<AdminDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }


        private AdminDto CreateUserObject(AppAdmin user)
        {
            return new AdminDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        } 

        [HttpGet("currentProf")]
        public async Task<ActionResult<ProfDto>> GetCurrentProf()
        {
            var prof = await _userManagerProf.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateProfObject(prof);
        }

         private ProfDto CreateProfObject(Profesori prof)
        {
            return new ProfDto
            {
                Id=prof.Id,
                DisplayName = prof.Name,
                Email=prof.Email,
                Image = null,
                Token = _tokenService.CreateTokenProf(prof),
                Username = prof.UserName,
                GradaAkademike=prof.GradaAkademike,
                DataRegjistrimit=prof.DataRegjistrimit
            };
        }
    }
}