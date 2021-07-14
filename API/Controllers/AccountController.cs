using System;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

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
        // private readonly DataContext _context;

        private readonly TokenService _tokenService;
        public AccountController(DataContext context, UserManager<AppAdmin> userManager, UserManager<Profesori> userManagerProf, SignInManager<AppAdmin> signInManager, SignInManager<Profesori> signInManagerProf, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _userManagerProf = userManagerProf;
            _signInManagerProf = signInManagerProf;
        }
        [AllowAnonymous]
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
                return new ProfDto
                {
                    Name = prof.Name,
                    Image = null,
                    Token = _tokenService.CreateTokenProf(prof),
                    UserName = prof.UserName,
                    GradaAkademike = prof.GradaAkademike,
                    DataRegjistrimit = prof.DataRegjistrimit,

                };
            }
            return Unauthorized();

        }
        [HttpPost("registerProf/{LendaId}")]
        public async Task<ActionResult<ProfDto>> RegisterProf(RegisterDto registerDto, Guid LendaId)
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
                Name = registerDto.Name,
                Email = registerDto.Email,
                UserName = registerDto.Username,
                GradaAkademike = registerDto.GradaAkademike,
                DataRegjistrimit = registerDto.DataRegjistrimit,
                LendaId = LendaId

            };

            // var lenda = await _context.Lendet.FirstOrDefaultAsync(x => x.EmriLendes == request.LendaEmri);


            var result = await _userManagerProf.CreateAsync(prof, registerDto.Password);

            if (result.Succeeded)
            {
                return CreateProfObject(prof, LendaId);
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

            return new ProfDto
            {
                Id = prof.Id,
                Name = prof.Name,
                Image = null,
                Token = _tokenService.CreateTokenProf(prof),
                UserName = prof.UserName,
                Email = prof.Email,

                GradaAkademike = prof.GradaAkademike,
                DataRegjistrimit = prof.DataRegjistrimit,

            };
        }

        private ProfDto CreateProfObject(Profesori prof, Guid lendaId)
        {
            return new ProfDto
            {
                Id = prof.Id,
                Name = prof.Name,
                Email = prof.Email,
                Image = null,
                Token = _tokenService.CreateTokenProf(prof),
                UserName = prof.UserName,
                GradaAkademike = prof.GradaAkademike,
                DataRegjistrimit = prof.DataRegjistrimit,
                LendaId = lendaId

            };
        }
    }
}