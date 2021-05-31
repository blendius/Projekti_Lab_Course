using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Lendet;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LendetController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Lenda>>> GetLendet()
        {

            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")] //postimi/id
        public async Task<ActionResult<Lenda>> GetLendet(Guid id)
        {
            return await Mediator.Send(new Details.Query{LendaId = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateLenda(Lenda lenda){
            return Ok(await Mediator.Send(new Create.Command {Lenda  = lenda}));
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