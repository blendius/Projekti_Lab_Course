using System;
namespace API.DTOs
{
    public class ProfDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
        public DateTime DataRegjistrimit { get; set; }
        public string GradaAkademike { get; set; }
    }
}