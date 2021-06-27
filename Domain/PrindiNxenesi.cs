using System;

namespace Domain
{
    public class PrindiNxenesi
    {
        public string PrindiId { get; set; }
        public Prindi Prindi { get; set; }
        public Guid NxenesiId { get; set; }
        public Nxenesi Nxenesi { get; set; }
    }
}