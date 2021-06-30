using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Oraret;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   // [AllowAnonymous]
    public class OraretController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Orari>>> GetOraret()
        {

            return await Mediator.Send(new List.Query());
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Orari>> GetOrari(Guid id)
        {
            return await Mediator.Send(new Details.Query{OrariId = id});
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateOrari(Orari orari){
            return Ok(await Mediator.Send(new Create.Command {Orari  = orari}));
        }
        [AllowAnonymous]
        [HttpPut("{id}")]

        public async Task<IActionResult> EditOrari(Guid id,Orari orari){
            orari.OrariId=id;
            return Ok(await Mediator.Send(new Edit.Command{Orari = orari}));
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrari(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{OrariId = id}));
        }
    }
}