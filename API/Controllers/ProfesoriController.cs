using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Professor;
using Application.ProfKlasa;
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

        [HttpGet("klasat/{id}")]
        public async Task<ActionResult<List<ProfesoriKlasa>>> GetProfessorKlasat(string id)
        {
            return await Mediator.Send(new ListProfKlasa.Query{Id = id});
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Profesori>> GetProfessor(string id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateProfessor(Profesori profesori)
        {
            return Ok(await Mediator.Send(new Create.Command { Profesori = profesori }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProfessor(string id, Profesori profesori)
        {
            profesori.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Profesori = profesori }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfessor(string id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }



        //add klasa to professor
        [HttpPost("{profId}&{klasaId}")]
        public async Task<IActionResult> CreateProfKlasa(ProfesoriKlasa profesoriKlasa, string profId, Guid klasaId)
        {
            return Ok(await Mediator.Send(new CreateProfKlasa.Command { ProfKlasa = profesoriKlasa, ProfesoriId = profId, KlasaId = klasaId }));
        }

        //delete relationship with klasa
        [HttpDelete("profKlasa/{id}")]
        public async Task<IActionResult> DeleteProfKlasa(Guid id)
        {
            return Ok(await Mediator.Send(new DeleteProfKlasa.Command { Id = id }));
        }

    }
}