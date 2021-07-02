using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Prinderit;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PrinderitController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Prindi>>> GetPrinderit()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]   
        public async Task<ActionResult<Prindi>> GetPrindi(string id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task <IActionResult> CreatePrindi(Prindi prindi)
        {
            return Ok(await Mediator.Send(new Create.Command{Prindi=prindi}));
        }

        [HttpPut("{id}")]
         public async Task <IActionResult> EditPrindi(string id ,Prindi prindi)
        {
            prindi.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Prindi=prindi}));
        }
        [HttpDelete("{id}")]
        public async Task <IActionResult> DeletePrindi(string id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}