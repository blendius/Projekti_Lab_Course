using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Laburatori;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace API.Controllers
{
[AllowAnonymous]
    public class LaburatoriController: BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Laburatiori>>> GetLaburatori()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Laburatiori>> GetLaburatori(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost("{LendaId}")]
        public async Task<IActionResult> CreateLaburatori(Laburatiori laburatiori, Guid LendaId)
        {
            return Ok(await Mediator.Send(new Create.Command { Laburatiori = laburatiori, lendaId=LendaId }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditLaburatori(Guid id, Laburatiori laburatiori)
        {
            laburatiori.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Laburatiori = laburatiori }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLaburatori(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }

}
