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
        public DbSet<Viti> Vitet { get; set; }
        public DbSet<Paralelja> Paralelet {get; set;}
        public DbSet<Klasa> Klasat {get; set;}
        public DbSet<Njoftimi> Njoftimet {get; set;}
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

            // base.OnModelCreating(modelbuilder);
            modelbuilder.Entity<Klasa>()
                .HasKey(vp => new { vp.VitiId, vp.ParaleljaId });
            modelbuilder.Entity<Klasa>()
                .HasOne(vp => vp.Viti)
                .WithMany(v => v.Klasa)
                .HasForeignKey(vp => vp.VitiId);
            modelbuilder.Entity<Klasa>()
                .HasOne(vp => vp.Paralelja)
                .WithMany(p => p.Klasa)
                .HasForeignKey(vp => vp.ParaleljaId);

            modelbuilder.Entity<Profesori>()
                .HasOne(p => p.KlasaKujdestari)
                .WithOne(k => k.Kujdestari)
                .HasForeignKey<Klasa>(k => k.ProfesoriId);
        }


        // builder.Entity<Kontakti>()
        // .HasOne(p => p.Id)
        // .WithMany(pr => pr.)
        // .HasForeignKey(pp => pp.ProfesoriId);

      
    }
}