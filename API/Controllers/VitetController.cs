using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Vitet;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VitetController : BaseApiController
    {   
        [HttpGet]
        public async Task<ActionResult<List<Viti>>> GetVitet()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]   
        public async Task<ActionResult<Viti>> GetViti(int id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task <IActionResult> CreateViti(Viti viti)
        {
            return Ok(await Mediator.Send(new Create.Command{Viti=viti}));
        }

        [HttpPut("{id}")]
         public async Task <IActionResult> EditViti(int id ,Viti viti)
        {
            viti.VitiId=id;
            return Ok(await Mediator.Send(new Edit.Command{Viti=viti}));
        }
        [HttpDelete("{id}")]
        public async Task <IActionResult> DeleteViti(int id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}