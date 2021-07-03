using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Nxenesit;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class NxenesiController : BaseApiController
    {

        
        [HttpGet]
        public async Task<ActionResult<List<Nxenesi>>> GetNxenesit()
        {
            List<Nxenesi> listaNxenesve = await Mediator.Send(new List.Query());
            // foreach (var nxenesi in listaNxenesve) {
            //     nxenesi.Password = null;
            // }
            return listaNxenesve;
        }
    
        [HttpGet("{id}")]
        public async Task<ActionResult<Nxenesi>> GetNxenesin(string id)
        {
            Nxenesi nxenesi = await Mediator.Send(new Details.Query{Id = id});
            return nxenesi;
        }

        [HttpPost]
        public async Task<IActionResult> CreateNxenesin(Nxenesi nxenesi)
        {
            return Ok(await Mediator.Send(new Create.Command{Nxenesi = nxenesi}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditNxenesin(string id, Nxenesi nxenesi)
        {
            Nxenesi nxenesiAktual = await Mediator.Send(new Details.Query{Id= id}); 

           // Nxenesi nxenesiAktual = await Mediator.Send(new Details.Query{Id= id}); 
            nxenesi.Id = id;
            nxenesi.PasswordHash = nxenesiAktual.PasswordHash;
            nxenesi.NormalizedEmail = nxenesiAktual.NormalizedEmail;
            nxenesi.NormalizedUserName = nxenesiAktual.NormalizedUserName;
            
            // nxenesiAktual.FullName = nxenesi.FullName;
            // nxenesiAktual.YearOfRegistration = nxenesi.YearOfRegistration;
            // nxenesiAktual.DateOfBirth = nxenesi.DateOfBirth;
            // nxenesiAktual.PhoneNumber = nxenesi.PhoneNumber;
            // nxenesiAktual.ParentName = nxenesi.ParentName;
            // nxenesiAktual.Class = nxenesi.Class;
            // nxenesiAktual.Email = nxenesi.Email;
            
            //checking if the user wrote their old password correctly
          //  bool samePassword = nxenesi.CurrentPassword == nxenesiAktual.Password;
            
            // bool passwordValid = nxenesi.CurrentPassword != "" && nxenesi.NewPassword != "" && 
                                    // nxenesi.ConfirmPassword != "" && nxenesi.ConfirmPassword == nxenesi.NewPassword 
                                  //  && samePassword;
        
            //to do: store hashed passwords 
            // if(passwordValid){
            // //    nxenesiAktual.Password = nxenesi.NewPassword;
            // }
            return Ok(await Mediator.Send(new Edit.Command{Nxenesi = nxenesi}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNxenesin(string id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

         [HttpGet("klasa&{emriKlases}")]
        public async Task<ActionResult<List<Nxenesi>>> GetNxenesitByKlasa(string emriKlases)
        {
            return await Mediator.Send(new ListByClass.Query{EmriKlases=emriKlases});
        }

    }
}