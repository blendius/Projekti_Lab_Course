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
        private readonly UserManager<Nxenesi> _userManage;
        private readonly SignInManager<Nxenesi> _signInManager;
        private readonly TokenService _tokenService;
        public NxenesiAccountController(UserManager<Nxenesi> userManage,
        SignInManager<Nxenesi> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManage = userManage;
        }

        [HttpPost("loginNxenesi")]
        public async Task<ActionResult<NxenesiDto>> Login(LoginDto loginDto)
        {
            var nxenesi = await _userManage.FindByEmailAsync(loginDto.Email);
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
            if(await _userManage.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email i zene");
            }
             if(await _userManage.Users.AnyAsync(x => x.UserName == registerDto.Username))
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
                //YearOfRegistration = registerDto.YearOfRegistration
            };
            //System.Diagnostics.Debug.WriteLine(nxenesi);
            var result = await _userManage.CreateAsync(nxenesi, registerDto.Password);
            if(result.Succeeded) 
            {
                return CreateNxenesiObject(nxenesi);
            }
            return BadRequest("Pati probleme gjate regjistrimit");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<NxenesiDto>> GetCurrentNxenesin()
        {
            var nxenesi = await _userManage.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateNxenesiObject(nxenesi);
        }
    
        private NxenesiDto CreateNxenesiObject(Nxenesi nxenesi)
        {
              return new NxenesiDto
                {
                    DisplayName = nxenesi.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateTokenNxenesi(nxenesi),
                    Username = nxenesi.UserName,
                    Class = nxenesi.Class
                };

        }
    }
}