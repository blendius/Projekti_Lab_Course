﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210530161132_test")]
    partial class test
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.6");

            modelBuilder.Entity("Domain.Lenda", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("DataKrijimit")
                        .HasColumnType("TEXT");

                    b.Property<string>("Emri")
                        .HasColumnType("TEXT");

                    b.Property<string>("Permbajtja")
                        .HasColumnType("TEXT");

                    b.Property<string>("Syllabusi")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Lendet");
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

            modelBuilder.Entity("Domain.Profesori", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataRegjistrimit")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Fjalkalimi")
                        .HasColumnType("TEXT");

                    b.Property<string>("GradaAkademike")
                        .HasColumnType("TEXT");

                    b.Property<string>("Lenda")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int>("Roli")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Profesoret");
                });

            modelBuilder.Entity("Domain.Termini", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("DataFillimit")
                        .HasColumnType("TEXT");

                    b.Property<string>("DataMbarimit")
                        .HasColumnType("TEXT");

                    b.Property<string>("KohaMbajtjes")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("LendaId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Salla")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("LendaId");

                    b.ToTable("Terminet");
                });

            modelBuilder.Entity("Domain.Termini", b =>
                {
                    b.HasOne("Domain.Lenda", "Lenda")
                        .WithMany()
                        .HasForeignKey("LendaId");

                    b.Navigation("Lenda");
                });
#pragma warning restore 612, 618
        }
    }
}
