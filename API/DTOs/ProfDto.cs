using System;
using Domain;

namespace API.DTOs
{
    public class ProfDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        public DateTime DataRegjistrimit { get; set; }
        public string GradaAkademike { get; set; }
        public Guid LendaId { get; set; }
        public Lenda Lenda {get;set;}
    }
}