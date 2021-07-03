using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Autobusat;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   // [AllowAnonymous]
    public class AutobusatController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Autobusi>>> GetAutobuset()
        {

            return await Mediator.Send(new List.Query());
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Autobusi>> GetAutobuset(Guid id)
        {
            return await Mediator.Send(new Details.Query{AutobusiId = id});
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateAutobusi(Autobusi autobusi){
            return Ok(await Mediator.Send(new Create.Command {Autobusi  = autobusi}));
        }
        [AllowAnonymous]
        [HttpPut("{id}")]

        public async Task<IActionResult> EditAutobusi(Guid id,Autobusi autobusi){
            autobusi.AutobusiId=id;
            return Ok(await Mediator.Send(new Edit.Command{Autobusi = autobusi}));
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAktiviteti(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{AutobusiId = id}));
        }
    }
}