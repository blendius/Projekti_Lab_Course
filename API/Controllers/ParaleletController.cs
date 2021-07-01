using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Paralelet;
using System;

namespace API.Controllers
{
    public class ParaleletController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Paralelja>>> GetParalelet()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]   
        public async Task<ActionResult<Paralelja>> GetParalelja(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task <IActionResult> CreateParalelja(Paralelja paralelja)
        {
            return Ok(await Mediator.Send(new Create.Command{Paralelja=paralelja}));
        }

        [HttpPut("{id}")]
         public async Task <IActionResult> EditParalelja(Guid id ,Paralelja paralelja)
        {
            paralelja.ParaleljaId=id;
            return Ok(await Mediator.Send(new Edit.Command{Paralelja=paralelja}));
        }
        [HttpDelete("{id}")]
        public async Task <IActionResult> DeleteParalelja(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}