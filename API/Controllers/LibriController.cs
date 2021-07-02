using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Librat;
using Domain;
//using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class LibriController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Libri>>> GetLibrin()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Libri>> GetLibrin(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost("{EmriLendes}")]
        public async Task<IActionResult> CreateLibrin(Libri libri, string EmriLendes)
        {
            return Ok(await Mediator.Send(new Create.Command { Libri = libri, LendaEmri=EmriLendes }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditLibrin(Guid id, Libri libri)
        {
            libri.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Libri = libri }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibrin(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}