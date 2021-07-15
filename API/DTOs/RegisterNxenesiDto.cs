using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterNxenesiDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
      //  [RegularExpression("(?=.*\\d) (?=.*[a-z]) (?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string ParentName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set;}

        [Required]
        public string Class { get; set; }

        [Required]
        public int YearOfRegistration{ get; set;}
        [Required]
        public string FullName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
    }
}