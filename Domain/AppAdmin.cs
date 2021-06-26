using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppAdmin : IdentityUser//userApp
    {
        public string DisplayName { get; set; } 
        public string Bio { get; set; }
    }
}