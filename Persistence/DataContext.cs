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
        public DbSet<Viti> Vitet { get; set; }
        public DbSet<Paralelja> Paralelet {get; set;}
        public DbSet<Klasa> Klasat {get; set;}
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);
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

            base.OnModelCreating(modelbuilder);
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
        }
    }
}