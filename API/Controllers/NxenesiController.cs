using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Nxenesit;
using Domain;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{

     public class CustomNxenesi
    {
        public Guid Id { get; set; }
        public string FullName{ get; set; }
        public string ParentName{ get; set; } //we need to make this foreign key to the table Prindi, for the moment we'll keep it as text.
        public string Class{ get; set; } //for the moment we'll keep it as text.
        //public string Grades { get; set; } we'll be added as foreign key to the relation that connects Profesori, Nxenesi and Lenda and contains the grade.
        public string Email {get; set; }
        public string CurrentPassword {get; set; }
        public DateTime DateOfBirth {get; set; }
        public int YearOfRegistration { get; set; }
        public string PhoneNumber{ get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword{ get; set; }
    }
    public class NxenesiController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Nxenesi>>> GetNxenesit()
        {
            List<Nxenesi> listaNxenesve = await Mediator.Send(new List.Query());
            foreach (var nxenesi in listaNxenesve) {
                nxenesi.Password = null;
            }
            return listaNxenesve;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Nxenesi>> GetNxenesin(Guid id)
        {
            Nxenesi nxenesi = await Mediator.Send(new Details.Query{Id = id});
            nxenesi.Password = null;
            return nxenesi;
        }

        [HttpPost]
        public async Task<IActionResult> CreateNxenesin(Nxenesi nxenesi)
        {
            return Ok(await Mediator.Send(new Create.Command{Nxenesi = nxenesi}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditNxenesin(Guid id, CustomNxenesi nxenesi)
        {
            Nxenesi nxenesiAktual = await Mediator.Send(new Details.Query{Id = id});
            nxenesiAktual.Id = id;
            nxenesiAktual.FullName = nxenesi.FullName;
            nxenesiAktual.YearOfRegistration = nxenesi.YearOfRegistration;
            nxenesiAktual.DateOfBirth = nxenesi.DateOfBirth;
            nxenesiAktual.PhoneNumber = nxenesi.PhoneNumber;
            nxenesiAktual.ParentName = nxenesi.ParentName;
            nxenesiAktual.Class = nxenesi.Class;
            nxenesiAktual.Email = nxenesi.Email;
            
            //checking if the user wrote their old password correctly
            bool samePassword = nxenesi.CurrentPassword == nxenesiAktual.Password;
            bool passwordValid = nxenesi.CurrentPassword.Trim() != "" && nxenesi.NewPassword.Trim() != "" && 
                                    nxenesi.ConfirmPassword.Trim() != "" && nxenesi.ConfirmPassword == nxenesi.NewPassword 
                                    && samePassword;
        
            //to do: store hashed passwords 
            if(passwordValid){
                nxenesiAktual.Password = nxenesi.NewPassword;
            }
            return Ok(await Mediator.Send(new Edit.Command{Nxenesi = nxenesiAktual}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNxenesin(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}