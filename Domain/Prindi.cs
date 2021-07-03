using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class Prindi : IdentityUser
    {
        public string DisplayName { get; set; }
        public DateTime DataLindjes { get; set; }
        public ICollection<Kontakti> Kontaktet { get; set; }
        public ICollection<Familja> Familjet {get; set;}
    }
}