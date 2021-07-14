using System.ComponentModel.DataAnnotations;
using System;
using Domain;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        //[RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
        [Required]
        public DateTime DataRegjistrimit { get; set; }
        [Required]
        public string GradaAkademike { get; set; }
        public Guid LendaId { get; set; }
        public Lenda Lenda { get; set; }


    }
}