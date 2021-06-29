using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Professor;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ProfesoriController : BaseApiController
    {
      

        [HttpGet]
        public async Task<ActionResult<List<Profesori>>> GetProfessors()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]   
        public async Task<ActionResult<Profesori>> GetProfessor(string id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost("{EmriLendes}")]
        public async Task <IActionResult> CreateProfessor(Profesori profesori,string emriLendes)
        {
            return Ok(await Mediator.Send(new Create.Command{Profesori=profesori,LendaEmri = emriLendes}));
        }

        [HttpPut("{id}")]
         public async Task <IActionResult> EditProfessor(string id ,Profesori profesori)
        {
            profesori.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Profesori=profesori}));
        }
        [HttpDelete("{id}")]
        public async Task <IActionResult> DeleteProfessor(string id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}