using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Professor;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfesoriController : BaseApiController
    {
      

        [HttpGet]
        public async Task<ActionResult<List<Profesori>>> GetProfessors()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]   
        public async Task<ActionResult<Profesori>> GetProfessor(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task <IActionResult> CreateProfessor(Profesori profesori)
        {
            return Ok(await Mediator.Send(new Create.Command{Profesori=profesori}));
        }

        [HttpPut("{id}")]
         public async Task <IActionResult> EditProfessor(Guid id ,Profesori profesori)
        {
            profesori.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Profesori=profesori}));
        }
        [HttpDelete("{id}")]
        public async Task <IActionResult> DeleteProfessor(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}