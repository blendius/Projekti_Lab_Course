using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet <Postimi> Postimet { get; set; }
        public DbSet <Lenda> Lendet { get; set; }
        public DbSet <Termini> Terminet { get; set; }
        
        
        public DbSet <Profesori> Profesoret { get; set; }
        
    }
}