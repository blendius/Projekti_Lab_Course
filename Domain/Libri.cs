using System;

namespace Domain
{
    public class Libri
    {
        public Guid Id { get; set; }
        public string Titulli { get; set; }
        public string Autori { get; set; }
        public string Linku { get; set; }
        public Guid LendaId { get; set; }
        public Lenda Lenda { get; set; }
        public string LendaString {get; set;} 
        public string Klasa { get; set; }
        public string Pershkrimi { get; set; }
    }
}