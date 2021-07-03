using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Aktivitetet;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   // [AllowAnonymous]
    public class AktivitetetController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Aktiviteti>>> GetAktivitetet()
        {

            return await Mediator.Send(new List.Query());
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Aktiviteti>> GetAktiviteti(Guid id)
        {
            return await Mediator.Send(new Details.Query{AktivitetiId = id});
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateAktiviteti(Aktiviteti aktiviteti){
            return Ok(await Mediator.Send(new Create.Command {Aktiviteti  = aktiviteti}));
        }
        [AllowAnonymous]
        [HttpPut("{id}")]

        public async Task<IActionResult> EditAktiviteti(Guid id,Aktiviteti aktiviteti){
            aktiviteti.AktivitetiId=id;
            return Ok(await Mediator.Send(new Edit.Command{Aktiviteti = aktiviteti}));
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAktiviteti(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{AktivitetiId = id}));
        }
    }
}