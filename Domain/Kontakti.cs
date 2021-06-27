using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Kontakti
    {
        [Key]
        public Guid KontaktiId { get; set; }
        public string PrindiId { get; set; }
        
        public Prindi Prindi { get; set; }        
        public string profEmail { get; set; }
        public string Subjelti { get; set; }
        public string Mesazhi { get; set; }
        public DateTime DataEDergimit { get; set; }= DateTime.Now;
    }
}