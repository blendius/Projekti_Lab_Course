// using System.Data.Entity;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    // public class SchoolDBContext: DbContext
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
        public DbSet<Paralelja> Paralelet { get; set; }
        public DbSet<Klasa> Klasat { get; set; }
        public DbSet<Salla> Sallat { get; set; }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);
            // builder.Entity<Kontakti>(x => x.HasKey(aa => new { aa.KontaktiId}));
            // builder.Entity<Prindi>(x => x.HasKey(aa => new { aa.KontaktiId}));

            modelbuilder.Entity<Kontakti>()
            .HasOne(p => p.Prindi)
            .WithMany(p => p.Kontaktet)
             .HasForeignKey(pp => pp.PrindiId);

            modelbuilder.Entity<Laburatiori>()
          .HasOne(p => p.Lenda)
          .WithMany(p => p.Laburatoret)
           .HasForeignKey(pp => pp.LendaId);

            modelbuilder.Entity<Klasa>()
            .HasOne(p => p.Paralelja)
            .WithMany(k => k.Klasa)
            .HasForeignKey(kp => kp.ParaleljaId);

            modelbuilder.Entity<Salla>()
            .HasOne(s => s.Klasa)
            .WithOne(k => k.Salla)
            .HasForeignKey<Klasa>(k => k.SallaId);

            modelbuilder.Entity<PrindiNxenesi>()
                .HasKey(pn => new { pn.PrindiId, pn.NxenesiId });
            modelbuilder.Entity<PrindiNxenesi>()
                .HasOne(pn => pn.Prindi)
                .WithMany(p => p.PrinderitNxenesit)
                .HasForeignKey(pn => pn.PrindiId);
            modelbuilder.Entity<PrindiNxenesi>()
                .HasOne(pn => pn.Nxenesi)
                .WithMany(p => p.PrinderitNxenesit)
                .HasForeignKey(pn => pn.NxenesiId);


        }


        // builder.Entity<Kontakti>()
        // .HasOne(p => p.Id)
        // .WithMany(pr => pr.)
        // .HasForeignKey(pp => pp.ProfesoriId);


    }
}