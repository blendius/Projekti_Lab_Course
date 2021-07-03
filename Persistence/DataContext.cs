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
        public DbSet<Prindi> Prinderit { get; set; }
        public DbSet<Nxenesi> Nxenesit { get; set; }
        public DbSet<Laburatiori> Laburatioret { get; set; }
        public DbSet<Kontakti> Kontaktet { get; set; }
        public DbSet<Paralelja> Paralelet { get; set; }
        public DbSet<Klasa> Klasat { get; set; }
        public DbSet<Salla> Sallat { get; set; }
        public DbSet<Orari> Oraret { get; set; }
        public DbSet<Pajisja> Pajisjet { get; set; }
        public DbSet<Vleresimi>  Vleresimi { get; set; }
        public DbSet<FeedbackToNxenesi> FeedbackToNxenesit { get; set; }
        public DbSet<Njoftimi> Njoftimet {get; set;}
        public DbSet<Libri> Librat { get; set; }


        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);

            modelbuilder.Entity<FeedbackToNxenesi>()
                .HasOne(p => p.Profesori)
                .WithMany(p => p.FeedbackToNxenesit)
                .HasForeignKey(pp => pp.ProfesoriID);

            modelbuilder.Entity<Kontakti>()
            .HasOne(p => p.Prindi)
            .WithMany(p => p.Kontaktet)
             .HasForeignKey(pp => pp.PrindiId);

            modelbuilder.Entity<Laburatiori>()
          .HasOne(p => p.Lenda)
          .WithMany(p => p.Laburatoret)
           .HasForeignKey(pp => pp.LendaId);

           modelbuilder.Entity<Pajisja>()
          .HasOne(p => p.Laburatiori)
          .WithMany(p => p.Pajisjet)
           .HasForeignKey(pp => pp.LaburatioriId);
           
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

            modelbuilder.Entity<Libri>()
                .HasOne(p => p.Lenda)
                .WithMany(p => p.Librat)
                .HasForeignKey(pp => pp.LendaId);
        }
    }
}