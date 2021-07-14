using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterPrindDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        //[RegularExpression("(?=.\\d)(?=.[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password duhet te jete kompleks!")]
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }
        public DateTime DataLindjes { get; set; }
        public string PhoneNumber { get; set; }
    }
}