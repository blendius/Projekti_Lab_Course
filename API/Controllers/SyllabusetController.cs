using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Syllabuset;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class SyllabusetController : BaseApiController
    {   
        [HttpGet]
        public async Task<ActionResult<List<Syllabusi>>> GetSyllabuset()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]   
        public async Task<ActionResult<Syllabusi>> GetSyllabusi(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task <IActionResult> CreateSalla(Syllabusi syllabusi)
        {
            return Ok(await Mediator.Send(new Create.Command{Syllabusi=syllabusi}));
        }

        [HttpPut("{id}")]
         public async Task <IActionResult> EditSalla(Guid id ,Syllabusi syllabusi)
        {
            syllabusi.SyllabusiId=id;
            return Ok(await Mediator.Send(new Edit.Command{Syllabusi=syllabusi}));
        }
        [HttpDelete("{id}")]
        public async Task <IActionResult> DeleteSalla(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}