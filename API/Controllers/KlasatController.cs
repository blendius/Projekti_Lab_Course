using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Klasat;
using System;

namespace API.Controllers
{
    public class KlasatController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Klasa>>> GetKlasat()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{klasaId}")]
        public async Task<ActionResult<Klasa>> GetKlasa(Guid klasaId)
        {
            return await Mediator.Send(new Details.Query { KlasaId = klasaId });
        }

        [HttpPost("{paraleljaId}&{sallaId}")]
        public async Task<IActionResult> CreateKlasa(Klasa klasa, Guid paraleljaId, Guid sallaId)
        {
            return Ok(await Mediator.Send(new Create.Command { Klasa = klasa, SallaId=sallaId, ParaleljaId=paraleljaId }));
        }

        [HttpPut("{klasaId}&{paraleljaId}&{sallaId}")]
        public async Task<IActionResult> EditViti(Guid klasaId, Guid paraleljaId, Guid sallaId, Klasa klasa)
        {
            klasa.KlasaId = klasaId;
            return Ok(await Mediator.Send(new Edit.Command { Klasa = klasa , ParaleljaId = paraleljaId, SallaId = sallaId}));
        }
        [HttpDelete("{klasaId}")]
        public async Task<IActionResult> DeleteViti(Guid klasaId)
        {
            return Ok(await Mediator.Send(new Delete.Command { KlasaId = klasaId }));
        }
    }
}