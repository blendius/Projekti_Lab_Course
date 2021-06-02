using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Klubet;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class KlubetController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Klubi>>> GetKlubet()
        {

            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")] //postimi/id
        public async Task<ActionResult<Klubi>> GetKlubet(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateKlubi(Klubi klubi){
            return Ok(await Mediator.Send(new Create.Command {Klubi  = klubi}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditKlubi(Guid id,Klubi klubi){
            klubi.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Klubi = klubi}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostimi(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}