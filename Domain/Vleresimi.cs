using System;

namespace Domain
{
    public class Vleresimi
    {
        public Guid VleresimiId { get; set; }
        public string NxenesiId { get; set; }
        public Nxenesi Nxenesi { get; set; }
        public string  ProfesoriId{ get; set; }
        public Profesori  Profesori{ get; set; }
        public string Nota { get; set; }
        public string Lenda { get; set; }
        public string Gjysemvjetori { get; set; }
        public string Viti { get; set; }
        public DateTime DataRegjistrimit { get; set; }
        
    }
}