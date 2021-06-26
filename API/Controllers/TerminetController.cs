using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Terminet;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class TerminetController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetTerminet()
        {
            return HandleResult( await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")] //postimi/id
        public async Task<IActionResult> GetTermini(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
        }
        [HttpPost]
        public async Task<IActionResult> CreateTermini(Termini termini)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Termini = termini}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTermini(Guid id,Termini termini)
        {
            termini.Id= id;
            return Ok(await Mediator.Send(new Edit.Command{Termini= termini}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTermini(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}