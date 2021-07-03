using System;

namespace Domain
{
    public class Aktiviteti
    {
        public Guid AktivitetiId { get; set; }
        public string Emri { get; set; }
        public string Pershkrimi { get; set; }
        public string DataMbajtjes { get; set; }
        public string EmriSalles { get; set; }
    }
}