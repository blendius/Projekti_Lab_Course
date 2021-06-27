using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class Prindi : IdentityUser
    {
        public string DisplayName { get; set; }
        public DateTime DataLindjes {get; set;}
        public ICollection<PrindiNxenesi> PrinderitNxenesit {get; set;}
    }
}