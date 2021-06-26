using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppAdmin>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Postimi> Postimet { get; set; }
        public DbSet<Profesori> Profesoret { get; set; }
        public DbSet<Lenda> Lendet { get; set; }
        public DbSet<Termini> Terminet { get; set; }
        public DbSet<Prindi> Prinderit { get; set; }
        public DbSet<Nxenesi> Nxenesit { get; set; }
        public DbSet<Laburatiori> Laburatioret{ get; set; }
    }
}