using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Nxenesit;
using Domain;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class NxenesiController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Nxenesi>>> GetNxenesit()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Nxenesi>> GetNxenesin(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateNxenesin(Nxenesi nxenesi)
        {
            return Ok(await Mediator.Send(new Create.Command{Nxenesi = nxenesi}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditNxenesin(Guid id, Nxenesi nxenesi)
        {
            nxenesi.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Nxenesi = nxenesi}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNxenesin(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}