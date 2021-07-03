using System;

namespace API.DTOs
{
    public class PrindDto
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        public DateTime DataLindjes { get; set; }
        public string NrTel { get; set; }
    }
}