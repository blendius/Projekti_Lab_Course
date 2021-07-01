using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Pajisjet;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
[AllowAnonymous]
    public class PajisjetController: BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Pajisja>>> GetPajisjet()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pajisja>> GetPajisja(Guid id)
        {
            return await Mediator.Send(new Details.Query { PajisjaId = id });
        }

        [HttpPost("{IdLaboratori}")]
        public async Task<IActionResult> CreatePajisja(Pajisja pajisja, Guid LabId)
        {
            return Ok(await Mediator.Send(new Create.Command { Pajisja = pajisja, LaboratoriId=LabId }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditPajisja(Guid id, Pajisja pajisja)
        {
            pajisja.PajisjaId = id;
            return Ok(await Mediator.Send(new Edit.Command { Pajisja = pajisja }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePajisja(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { PajisjaId = id }));
        }
    }

}
