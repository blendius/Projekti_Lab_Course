using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain
{
    public class Nxenesi : IdentityUser
    {
        public string DisplayName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Class { get; set; }

        // public Guid Id { get; set; }
        public string FullName { get; set; }
        public string ParentName { get; set; } //we need to make this foreign key to the table Prindi, for the moment we'll keep it as text.
        // public string Class{ get; set; } //for the moment we'll keep it as text.
        //public string Grades { get; set; } //we'll be added as foreign key to the relation that connects Profesori, Nxenesi and Lenda and contains the grade.
        // public string Email {get; set; }
        //public string Password {get; set; }
        //public DateTime DateOfBirth {get; set; }
        public int YearOfRegistration { get; set; }
        //public string PhoneNumber{ get; set; }
        public ICollection<Familja> Familjet { get; set; }
        public ICollection<Vleresimi> Vleresimet { get; set; }
    }
}