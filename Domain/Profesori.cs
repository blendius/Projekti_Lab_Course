using System;

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
        public string Lenda {get; set; } //later to be referenced from table Lenda
        public int Roli { get; set; }
    }
}