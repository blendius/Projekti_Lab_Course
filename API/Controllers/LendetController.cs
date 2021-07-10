using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Lendet;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class LendetController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Lenda>>> GetLendet()
        {

            return await Mediator.Send(new List.Query());
        }
        [Authorize]
        [HttpGet("{id}")] //postimi/id
        public async Task<ActionResult<Lenda>> GetLendet(Guid id)
        {
            return await Mediator.Send(new Details.Query{LendaId = id});
        }

        [HttpPost("{syllabusiID}")]
        public async Task<IActionResult> CreateLenda(Lenda lenda,Guid syllabusiID){
            return Ok(await Mediator.Send(new Create.Command {Lenda  = lenda , Syllabusi = syllabusiID }));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditLenda(Guid id,Lenda lenda){
            lenda.LendaId=id;
            return Ok(await Mediator.Send(new Edit.Command{Lenda = lenda}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostimi(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}