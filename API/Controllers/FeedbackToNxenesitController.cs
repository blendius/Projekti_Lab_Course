using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.FeedbackToNxenesit;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FeedbackToNxenesitController : BaseApiController
    {
        [HttpGet("{Id}")]
        public async Task<ActionResult<List<FeedbackToNxenesi>>> GetFeedbackProfesori(Guid id)
        {
            return await Mediator.Send(new ListProf.Query { ProfId = id });
        }
        [HttpGet("nxenesi/{email}")]
        public async Task<ActionResult<List<FeedbackToNxenesi>>> GetFeedbackNxenesi(string email)
        {
            return await Mediator.Send(new ListNxenesi.Query { NxenesiEmail = email });
        }

        [HttpPost]
        public async Task<IActionResult> CreateFeedback(FeedbackToNxenesi feedback)
        {
            return Ok(await Mediator.Send(new Create.Command { FeedbackToNxenesi = feedback }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedback(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}