using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class Profesori : IdentityUser
    {
        public string Name { get; set; }
        public string GradaAkademike { get; set; }
        public DateTime DataRegjistrimit { get; set; }
        public Guid LendaId { get; set; }
        public Lenda Lenda { get; set; }
       
        public ICollection<FeedbackToNxenesi> FeedbackToNxenesit { get; set; }
    }
}