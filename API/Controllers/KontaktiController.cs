using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Kontaktet;
using Domain;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    public class KontaktiController : BaseApiController
    {
          [HttpGet("{Id}")]
        public async Task<ActionResult<List<Kontakti>>> GetKontaktPrindi(string id)
        {
            return await Mediator.Send(new ListPrindi.Query{Id=id});
        }
          [HttpGet("prof/{profId}")]
        public async Task<ActionResult<List<Kontakti>>> GetKontaktProf(string profId)
        {
            return await Mediator.Send(new ListProf.Query{profId=profId});
        }
        
        [HttpPost("{profEmail}")]
        public async Task<IActionResult> CreateKontakti(Kontakti kontakti, string profEmail )
        {
            return Ok(await Mediator.Send(new Create.Command { Kontakti = kontakti, ProfEmail=profEmail }));
        }
        [HttpDelete("{id}")]
        public async Task <IActionResult> DeleteKontakti(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}