using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Prinderit;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class PrinderitController : BaseApiController
    {
      

        [HttpGet]
        public async Task<ActionResult<List<Prindi>>> GetPrinderit()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]   
        public async Task<ActionResult<Prindi>> GetPrindi(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task <IActionResult> CreatePrindi(Prindi prindi)
        {
            return Ok(await Mediator.Send(new Create.Command{Prindi=prindi}));
        }

        [HttpPut("{id}")]
         public async Task <IActionResult> EditPrindi(Guid id ,Prindi prindi)
        {
            prindi.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Prindi=prindi}));
        }
        [HttpDelete("{id}")]
        public async Task <IActionResult> DeletePrindi(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}