﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.6");

            modelBuilder.Entity("Domain.AppAdmin", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Bio")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("DisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Domain.Klasa", b =>
                {
                    b.Property<Guid>("KlasaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ParaleljaId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("SallaId")
                        .HasColumnType("TEXT");

                    b.Property<int>("Viti")
                        .HasColumnType("INTEGER");

                    b.HasKey("KlasaId");

                    b.HasIndex("ParaleljaId");

                    b.HasIndex("SallaId")
                        .IsUnique();

                    b.ToTable("Klasat");
                });

            modelBuilder.Entity("Domain.Kontakti", b =>
                {
                    b.Property<Guid>("KontaktiId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataEDergimit")
                        .HasColumnType("TEXT");

                    b.Property<string>("Mesazhi")
                        .HasColumnType("TEXT");

                    b.Property<string>("PrindiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Subjekti")
                        .HasColumnType("TEXT");

                    b.Property<string>("profEmail")
                        .HasColumnType("TEXT");

                    b.HasKey("KontaktiId");

                    b.HasIndex("PrindiId");

                    b.ToTable("Kontaktet");
                });

            modelBuilder.Entity("Domain.Laburatiori", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataEKrijimit")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("LendaId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Lloji")
                        .HasColumnType("TEXT");

                    b.Property<int>("NrPaisjeve")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("LendaId");

                    b.ToTable("Laburatioret");
                });

            modelBuilder.Entity("Domain.Lenda", b =>
                {
                    b.Property<Guid>("LendaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataEShtimit")
                        .HasColumnType("TEXT");

                    b.Property<string>("EmriLendes")
                        .HasColumnType("TEXT");

                    b.Property<string>("Pershkrimi")
                        .HasColumnType("TEXT");

                    b.Property<string>("Syllabusi")
                        .HasColumnType("TEXT");

                    b.HasKey("LendaId");

                    b.ToTable("Lendet");
                });

            modelBuilder.Entity("Domain.Nxenesi", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Class")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("DisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("FullName")
                        .HasColumnType("TEXT");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("TEXT");

                    b.Property<string>("ParentName")
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.Property<int>("YearOfRegistration")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Nxenesit");
                });

            modelBuilder.Entity("Domain.Orari", b =>
                {
                    b.Property<Guid>("OrariId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("EmriOrarit")
                        .HasColumnType("TEXT");

                    b.Property<string>("Enjte1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Enjte2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Enjte3")
                        .HasColumnType("TEXT");

                    b.Property<string>("Enjte4")
                        .HasColumnType("TEXT");

                    b.Property<string>("Enjte5")
                        .HasColumnType("TEXT");

                    b.Property<string>("Enjte6")
                        .HasColumnType("TEXT");

                    b.Property<string>("Hene1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Hene2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Hene3")
                        .HasColumnType("TEXT");

                    b.Property<string>("Hene4")
                        .HasColumnType("TEXT");

                    b.Property<string>("Hene5")
                        .HasColumnType("TEXT");

                    b.Property<string>("Hene6")
                        .HasColumnType("TEXT");

                    b.Property<string>("Marte1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Marte2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Marte3")
                        .HasColumnType("TEXT");

                    b.Property<string>("Marte4")
                        .HasColumnType("TEXT");

                    b.Property<string>("Marte5")
                        .HasColumnType("TEXT");

                    b.Property<string>("Marte6")
                        .HasColumnType("TEXT");

                    b.Property<string>("Merkure1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Merkure2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Merkure3")
                        .HasColumnType("TEXT");

                    b.Property<string>("Merkure4")
                        .HasColumnType("TEXT");

                    b.Property<string>("Merkure5")
                        .HasColumnType("TEXT");

                    b.Property<string>("Merkure6")
                        .HasColumnType("TEXT");

                    b.Property<string>("Premte1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Premte2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Premte3")
                        .HasColumnType("TEXT");

                    b.Property<string>("Premte4")
                        .HasColumnType("TEXT");

                    b.Property<string>("Premte5")
                        .HasColumnType("TEXT");

                    b.Property<string>("Premte6")
                        .HasColumnType("TEXT");

                    b.HasKey("OrariId");

                    b.ToTable("Oraret");
                });

            modelBuilder.Entity("Domain.Pajisja", b =>
                {
                    b.Property<Guid>("PajisjaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataEShtimit")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("LaburatioriId")
                        .HasColumnType("TEXT");

                    b.Property<string>("emriPajisjes")
                        .HasColumnType("TEXT");

                    b.Property<string>("kodiProduktit")
                        .HasColumnType("TEXT");

                    b.HasKey("PajisjaId");

                    b.HasIndex("LaburatioriId");

                    b.ToTable("Pajisjet");
                });

            modelBuilder.Entity("Domain.Paralelja", b =>
                {
                    b.Property<Guid>("ParaleljaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("KapacitetiMax")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Numri")
                        .HasColumnType("INTEGER");

                    b.HasKey("ParaleljaId");

                    b.ToTable("Paralelet");
                });

            modelBuilder.Entity("Domain.Postimi", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Data")
                        .HasColumnType("TEXT");

                    b.Property<string>("Permbajtja")
                        .HasColumnType("TEXT");

                    b.Property<string>("Titulli")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Postimet");
                });

            modelBuilder.Entity("Domain.Prindi", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataLindjes")
                        .HasColumnType("TEXT");

                    b.Property<string>("DisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Prinderit");
                });

            modelBuilder.Entity("Domain.PrindiNxenesi", b =>
                {
                    b.Property<string>("PrindiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("NxenesiId")
                        .HasColumnType("TEXT");

                    b.HasKey("PrindiId", "NxenesiId");

                    b.HasIndex("NxenesiId");

                    b.ToTable("PrindiNxenesi");
                });

            modelBuilder.Entity("Domain.Profesori", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataRegjistrimit")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("GradaAkademike")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("KlasaKujdestariKlasaId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("KlasaKujdestariKlasaId");

                    b.ToTable("Profesoret");
                });

            modelBuilder.Entity("Domain.Salla", b =>
                {
                    b.Property<Guid>("SallaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("EmriSalles")
                        .HasColumnType("TEXT");

                    b.HasKey("SallaId");

                    b.ToTable("Sallat");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Domain.Klasa", b =>
                {
                    b.HasOne("Domain.Paralelja", "Paralelja")
                        .WithMany("Klasa")
                        .HasForeignKey("ParaleljaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Salla", "Salla")
                        .WithOne("Klasa")
                        .HasForeignKey("Domain.Klasa", "SallaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Paralelja");

                    b.Navigation("Salla");
                });

            modelBuilder.Entity("Domain.Kontakti", b =>
                {
                    b.HasOne("Domain.Prindi", "Prindi")
                        .WithMany("Kontaktet")
                        .HasForeignKey("PrindiId");

                    b.Navigation("Prindi");
                });

            modelBuilder.Entity("Domain.Laburatiori", b =>
                {
                    b.HasOne("Domain.Lenda", "Lenda")
                        .WithMany("Laburatoret")
                        .HasForeignKey("LendaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lenda");
                });

            modelBuilder.Entity("Domain.Pajisja", b =>
                {
                    b.HasOne("Domain.Laburatiori", "Laburatiori")
                        .WithMany("Pajisjet")
                        .HasForeignKey("LaburatioriId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Laburatiori");
                });

            modelBuilder.Entity("Domain.PrindiNxenesi", b =>
                {
                    b.HasOne("Domain.Nxenesi", "Nxenesi")
                        .WithMany("PrinderitNxenesit")
                        .HasForeignKey("NxenesiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Prindi", "Prindi")
                        .WithMany("PrinderitNxenesit")
                        .HasForeignKey("PrindiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Nxenesi");

                    b.Navigation("Prindi");
                });

            modelBuilder.Entity("Domain.Profesori", b =>
                {
                    b.HasOne("Domain.Klasa", "KlasaKujdestari")
                        .WithMany()
                        .HasForeignKey("KlasaKujdestariKlasaId");

                    b.Navigation("KlasaKujdestari");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Domain.AppAdmin", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Domain.AppAdmin", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.AppAdmin", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Domain.AppAdmin", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Laburatiori", b =>
                {
                    b.Navigation("Pajisjet");
                });

            modelBuilder.Entity("Domain.Lenda", b =>
                {
                    b.Navigation("Laburatoret");
                });

            modelBuilder.Entity("Domain.Nxenesi", b =>
                {
                    b.Navigation("PrinderitNxenesit");
                });

            modelBuilder.Entity("Domain.Paralelja", b =>
                {
                    b.Navigation("Klasa");
                });

            modelBuilder.Entity("Domain.Prindi", b =>
                {
                    b.Navigation("Kontaktet");

                    b.Navigation("PrinderitNxenesit");
                });

            modelBuilder.Entity("Domain.Salla", b =>
                {
                    b.Navigation("Klasa");
                });
#pragma warning restore 612, 618
        }
    }
}
