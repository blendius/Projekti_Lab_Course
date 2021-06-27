using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Klasat;

namespace API.Controllers
{
    public class KlasatController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Klasa>>> GetKlasat()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{vitiId}&{paraleljaId}")]
        public async Task<ActionResult<Klasa>> GetKlasa(int vitiId, int paraleljaId)
        {
            return await Mediator.Send(new Details.Query { VitiId = vitiId, ParaleljaId = paraleljaId });
        }

        [HttpPost]
        public async Task<IActionResult> CreateKlasa(Klasa klasa)
        {
            return Ok(await Mediator.Send(new Create.Command { Klasa = klasa }));
        }

        [HttpPut("{vitiId}&{paraleljaId}")]
        public async Task<IActionResult> EditViti(int vitiId, int paraleljaId, Klasa klasa)
        {
            klasa.VitiId = vitiId;
            klasa.ParaleljaId = paraleljaId;
            return Ok(await Mediator.Send(new Edit.Command { Klasa = klasa }));
        }
        [HttpDelete("{vitiId}&{paraleljaId}")]
        public async Task<IActionResult> DeleteViti(int vitiId, int paraleljaId)
        {
            return Ok(await Mediator.Send(new Delete.Command { VitiId = vitiId, ParaleljaId = paraleljaId }));
        }
    }
}