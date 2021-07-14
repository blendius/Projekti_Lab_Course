using System;
using System.Collections.Generic;

namespace Domain
{
    public class Klasa
    {
        public Guid KlasaId {get; set;}
        public int Viti {get; set;}
        public Guid ParaleljaId { get; set; }
        public Paralelja Paralelja { get; set; }
        public Guid SallaId {get; set;}
        public Salla Salla {get; set;}
        public ICollection<ProfesoriKlasa> Profesoret { get; set; }
        public ICollection<Orari> Oraret { get; set; }
    }
}