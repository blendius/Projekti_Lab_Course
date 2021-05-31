using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Postimet;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PostimetController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Postimi>>> GetPostimet()
        {

            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")] //postimi/id
        public async Task<ActionResult<Postimi>> GetPostimi(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostimi(Postimi postimi){
            return Ok(await Mediator.Send(new Create.Command {Postimi = postimi}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditPostimi(Guid id,Postimi postimi){
            postimi.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Postimi = postimi}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostimi(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}