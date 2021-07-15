using System;
using System.Collections.Generic;

namespace Domain
{
    public class Paralelja
    {
        public Guid ParaleljaId { get; set; }
        public int Numri { get; set; }
        public int KapacitetiMax { get; set; }
        public int KapacitetiMin { get; set; }
        public ICollection<Klasa> Klasa { get; set; }
    }
}