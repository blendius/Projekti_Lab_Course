using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Familjet;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class FamiljetController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Familja>>> GetFamiljet()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Familja>> GetFamiljet(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        [HttpPost("{PrindiId}&{NxenesiId}")]

        public async Task<IActionResult> CreateFamilja(Familja familja, string prindiId, string nxenesiId)
        {
            return Ok(await Mediator.Send(new Create.Command { Familja = familja, PrindiId = prindiId, NxenesiId = nxenesiId }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFamilja(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
        [HttpPut("{id}/{PrindiId}&{NxenesiId}")]

        public async Task<IActionResult> EditFamilja(Guid id, Familja familja, string prindiId, string nxenesiId)
        {
            familja.FamiljaId = id;
            return Ok(await Mediator.Send(new Edit.Command { Familja = familja }));
        }
    }
}