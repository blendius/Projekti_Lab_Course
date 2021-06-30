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
        [HttpPost("{ProfId}&{NxenesiId}")]

        public async Task<IActionResult> CreateVlersimi(Vleresimi vleresimi, string ProfId, string NxenesiId )
        {
            return Ok(await Mediator.Send(new Create.Command { Vleresimi = vleresimi, profId=ProfId, nxenesiId=NxenesiId  }));
        }
    }
}