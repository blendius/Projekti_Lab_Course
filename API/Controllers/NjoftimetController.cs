using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Njoftimet;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
     [AllowAnonymous]
    public class NjoftimetController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Njoftimi>>> GetNjoftimet()
        {
            return await Mediator.Send(new List.Query());
            
        }
        [Authorize]
        [HttpGet("{id}")] 
        public async Task<ActionResult<Njoftimi>> GetNjoftimin(Guid id)
        {
            Njoftimi njoftimi = await Mediator.Send(new Details.Query{NjoftimiId = id});
            return njoftimi;
        }

        [HttpPost]
        public async Task<IActionResult> CreateNjoftimin(Njoftimi njoftimi){
            return Ok(await Mediator.Send(new Create.Command{Njoftimi  = njoftimi}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditNjoftimin(Guid id,Njoftimi njoftimi){
            njoftimi.NjoftimiId=id;
            return Ok(await Mediator.Send(new Edit.Command{Njoftimi = njoftimi}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNjoftimin(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{NjoftimiId = id}));
        }
    }
}