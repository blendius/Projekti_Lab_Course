using System;

namespace Domain
{
    public class ProfesoriKlasa
    {
        public Guid Id { get; set; }
        public string ProfId { get; set; }
        public Profesori Profesori { get; set; }
        public Guid KlasaId { get; set; }
        public Klasa Klasa { get; set; }
    }
}