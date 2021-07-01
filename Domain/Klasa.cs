using System;

namespace Domain
{
    public class Klasa
    {
        public Guid KlasaId {get; set;}
        public int Viti {get; set;}
        public int ParaleljaId { get; set; }
        public Paralelja Paralelja { get; set; }
        public Guid SallaId {get; set;}
        public Salla Salla {get; set;}
    }
}