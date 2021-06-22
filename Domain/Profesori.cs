using System;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class Profesori: IdentityUser
    {
        public string Name { get; set; }
        public string GradaAkademike {get; set;}
        public DateTime DataRegjistrimit { get; set; }
        
    }
}