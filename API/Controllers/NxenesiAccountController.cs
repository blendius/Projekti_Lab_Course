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
    public class NxenesiAccountController : ControllerBase
    {
        private readonly UserManager<Nxenesi> _userManager;
        private readonly SignInManager<Nxenesi> _signInManager;
        private readonly TokenService _tokenService;
        public NxenesiAccountController(UserManager<Nxenesi> userManager,
        SignInManager<Nxenesi> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("loginNxenesi")]
        public async Task<ActionResult<NxenesiDto>> Login(LoginDto loginDto)
        {
            var nxenesi = await _userManager.FindByEmailAsync(loginDto.Email);
            if (nxenesi == null) return Unauthorized();
            var result = await _signInManager.CheckPasswordSignInAsync(nxenesi, loginDto.Password, false);
            
            if (result.Succeeded)
            {
              return CreateNxenesiObject(nxenesi);
            }
            return Unauthorized();
        }

        [HttpPost("registerNxenesi")]
        public async Task<ActionResult<NxenesiDto>> Register(RegisterNxenesiDto registerDto)
        {
            if(await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email i zene");
            }
             if(await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                return BadRequest("Username i zene");
            }

            var nxenesi = new Nxenesi
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username,
                ParentName = registerDto.ParentName,
                DateOfBirth = registerDto.DateOfBirth,
                Class = registerDto.Class,
                YearOfRegistration = registerDto.YearOfRegistration,
                FullName = registerDto.FullName,
                PhoneNumber = registerDto.PhoneNumber

            };
            //System.Diagnostics.Debug.WriteLine(nxenesi);
            var result = await _userManager.CreateAsync(nxenesi, registerDto.Password);
            if(result.Succeeded) 
            {
                return CreateNxenesiObject(nxenesi);
            }
            return BadRequest("Pati probleme gjate regjistrimit");
        }

        [Authorize]
        [HttpGet("currentNxenesi")]
        public async Task<ActionResult<NxenesiDto>> GetCurrentNxenesin()
        {
            var nxenesi = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateNxenesiObject(nxenesi);
        }
    
        private NxenesiDto CreateNxenesiObject(Nxenesi nxenesi)
        {
              return new NxenesiDto
                {
                    Id = nxenesi.Id,
                    DisplayName = nxenesi.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateTokenNxenesi(nxenesi),
                    Username = nxenesi.UserName,
                    Class = nxenesi.Class,
                    FullName = nxenesi.FullName,
                    email = nxenesi.Email,
                    ParentName = nxenesi.ParentName,
                    DateOfBirth = nxenesi.DateOfBirth,
                    PhoneNumber = nxenesi.PhoneNumber,
                    YearOfRegistration = nxenesi.YearOfRegistration
                };

        }
    }
}