using System;

namespace Domain
{
    public class Familja
    {
        public Guid FamiljaId {get; set;}
        public string PrindiId {get; set;}
        public Prindi Prindi { get; set; }
        public string NxenesiId {get; set;}
        public Nxenesi Nxenesi { get; set; }
    }
}