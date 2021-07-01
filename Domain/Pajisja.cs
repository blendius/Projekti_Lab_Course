using System;

namespace Domain
{
    public class Pajisja
    {
        public Guid PajisjaId { get; set; }
        public string kodiProduktit { get; set; }
        public string emriPajisjes { get; set; }
        public DateTime DataEShtimit { get; set; } = DateTime.Now;
        public Guid LaburatioriId { get; set; }
        public Laburatiori Laburatiori{ get; set; }
    }
}