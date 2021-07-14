using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Autobusi
    {   
        public Guid AutobusiId { get; set; }
        public string targat { get; set; }
        
        public string brendi { get; set; }
        public string vitiProdhimit { get; set; }
        public int nrPasagjereve { get; set; }
        public string OraNisjes { get; set; }

    }
}