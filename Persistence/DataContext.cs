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
        public DbSet<Laburatiori> Laburatioret { get; set; }
        public DbSet<Kontakti> Kontaktet { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // builder.Entity<Kontakti>(x => x.HasKey(aa => new { aa.KontaktiId}));
            // builder.Entity<Prindi>(x => x.HasKey(aa => new { aa.KontaktiId}));

            builder.Entity<Kontakti>()
            .HasOne(p => p.Prindi)
            .WithMany(p => p.Kontaktet)
             .HasForeignKey(pp => pp.PrindiId);

            
            // builder.Entity<Kontakti>()
            // .HasOne(p => p.Id)
            // .WithMany(pr => pr.)
            // .HasForeignKey(pp => pp.ProfesoriId);
        }
    }
}