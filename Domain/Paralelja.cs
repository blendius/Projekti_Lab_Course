using System.Collections.Generic;

namespace Domain
{
    public class Paralelja
    {
        public int ParaleljaId { get; set; }
        public int KapacitetiMax { get; set; }
        public ICollection<Klasa> Klasa { get; set; }
    }
}