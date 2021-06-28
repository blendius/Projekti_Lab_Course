using System.Collections.Generic;

namespace Domain
{
    public class Viti
    {
        public int VitiId { get; set; }
        public int Kohezgjatja { get; set; }
        public ICollection<Klasa> Klasa { get; set; }
    }
}