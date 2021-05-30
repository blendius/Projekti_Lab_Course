using System;
using System.Collections.Generic;

namespace Domain
{
    public class Profesori
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Fjalkalimi { get; set; }
        public string GradaAkademike {get; set;}
        public DateTime DataRegjistrimit { get; set; }
        public int Roli { get; set; }

        public ICollection<Lenda> Lendet{get;set;}
    }
}