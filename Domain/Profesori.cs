using System;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class Profesori: IdentityUser
    {
        public string Name { get; set; }
        public string GradaAkademike {get; set;}
        public DateTime DataRegjistrimit { get; set; }
        public string Lenda {get; set; } //later to be referenced from table Lenda
        public int Roli { get; set; }
    }
}