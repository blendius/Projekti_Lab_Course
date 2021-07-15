using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Vleresimet;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class VleresimetController : BaseApiController
    {
        [HttpGet("prof/{profId}")]
        public async Task<ActionResult<List<Vleresimi>>> GetVlersimet(string profId)
        {
            return await Mediator.Send(new List.Query{profId=profId});
        }
        [HttpGet("nxenesi/{nxenesiId}")]
        public async Task<ActionResult<List<Vleresimi>>> GetVleresimetByNxenesi(string nxenesiId)
        {
            return await Mediator.Send(new ListByNxenesi.Query{nxenesiId=nxenesiId});
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Vleresimi>> GetVlersimet(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        [HttpGet("prindi/{prindiId}")]

        //get array of students from parent id
        public async Task<ActionResult<Familja[]>> GetNxenesiByPrindi(string prindiId)
        {
            return await Mediator.Send(new GetNxenesiById.Query{prindiId=prindiId});
        }
        
        [HttpPost("{ProfId}&{NxenesiId}")]

        public async Task<IActionResult> CreateVlersimi(Vleresimi vleresimi, string ProfId, string NxenesiId)
        {
            return Ok(await Mediator.Send(new Create.Command { Vleresimi = vleresimi, profId = ProfId, nxenesiId = NxenesiId }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVleresimi(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
        [HttpPut("{id}/{ProfId}&{NxenesiId}")]

        public async Task<IActionResult> EditVleresimi(Guid id, Vleresimi vleresimi, string ProfId, string NxenesiId)
        {
            vleresimi.VleresimiId = id;
            return Ok(await Mediator.Send(new Edit.Command { Vleresimi = vleresimi }));
        }
    }
}