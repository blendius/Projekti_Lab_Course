using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class Profesori : IdentityUser
    {
        public string Name { get; set; }
        public string GradaAkademike { get; set; }
        public DateTime DataRegjistrimit { get; set; } = DateTime.Now;
        public Guid LendaId { get; set; }
        public Lenda Lenda { get; set; }
       
        public ICollection<FeedbackToNxenesi> FeedbackToNxenesit { get; set; }
        public Klasa KlasaKujdestari { get; set; } // lex. Kujdestari me i te theksuar (as in Profi ka per detyre kujdestarinë e nje klase)
        public ICollection<Vleresimi> Vleresimet  { get; set; } 
        public ICollection<ProfesoriKlasa> Klaset  { get; set; } 
        
        public ICollection<Kontakti> Kontaktet  { get; set; } 
    }
}