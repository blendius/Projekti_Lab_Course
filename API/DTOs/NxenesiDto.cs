using System;

namespace API.DTOs
{
    public class NxenesiDto
    {
        public string Id {get; set;}
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string email { get; set; }
        public string Image { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Class { get; set; }
        public string ParentName { get; set; }
        public int YearOfRegistration{ get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        
    }
}