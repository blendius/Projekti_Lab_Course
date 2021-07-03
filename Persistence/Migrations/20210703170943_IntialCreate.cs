using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class IntialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aktivitetet",
                columns: table => new
                {
                    AktivitetiId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Emri = table.Column<string>(type: "TEXT", nullable: true),
                    Pershkrimi = table.Column<string>(type: "TEXT", nullable: true),
                    DataMbajtjes = table.Column<string>(type: "TEXT", nullable: true),
                    EmriSalles = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aktivitetet", x => x.AktivitetiId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    DisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    Bio = table.Column<string>(type: "TEXT", nullable: true),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Autobusat",
                columns: table => new
                {
                    AutobusiId = table.Column<Guid>(type: "TEXT", nullable: false),
                    targatId = table.Column<string>(type: "TEXT", nullable: true),
                    brendi = table.Column<string>(type: "TEXT", nullable: true),
                    vitiProdhimit = table.Column<string>(type: "TEXT", nullable: true),
                    nrPasagjereve = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Autobusat", x => x.AutobusiId);
                });

            migrationBuilder.CreateTable(
                name: "Lendet",
                columns: table => new
                {
                    LendaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    EmriLendes = table.Column<string>(type: "TEXT", nullable: true),
                    Pershkrimi = table.Column<string>(type: "TEXT", nullable: true),
                    Syllabusi = table.Column<string>(type: "TEXT", nullable: true),
                    DataEShtimit = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lendet", x => x.LendaId);
                });

            migrationBuilder.CreateTable(
                name: "Njoftimet",
                columns: table => new
                {
                    NjoftimiId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Titulli = table.Column<string>(type: "TEXT", nullable: true),
                    Pershkrimi = table.Column<string>(type: "TEXT", nullable: true),
                    DataEShtimit = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Njoftimet", x => x.NjoftimiId);
                });

            migrationBuilder.CreateTable(
                name: "Nxenesit",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    DisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Class = table.Column<string>(type: "TEXT", nullable: true),
                    FullName = table.Column<string>(type: "TEXT", nullable: true),
                    ParentName = table.Column<string>(type: "TEXT", nullable: true),
                    YearOfRegistration = table.Column<int>(type: "INTEGER", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nxenesit", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Oraret",
                columns: table => new
                {
                    OrariId = table.Column<Guid>(type: "TEXT", nullable: false),
                    EmriOrarit = table.Column<string>(type: "TEXT", nullable: true),
                    Hene1 = table.Column<string>(type: "TEXT", nullable: true),
                    Hene2 = table.Column<string>(type: "TEXT", nullable: true),
                    Hene3 = table.Column<string>(type: "TEXT", nullable: true),
                    Hene4 = table.Column<string>(type: "TEXT", nullable: true),
                    Hene5 = table.Column<string>(type: "TEXT", nullable: true),
                    Hene6 = table.Column<string>(type: "TEXT", nullable: true),
                    Marte1 = table.Column<string>(type: "TEXT", nullable: true),
                    Marte2 = table.Column<string>(type: "TEXT", nullable: true),
                    Marte3 = table.Column<string>(type: "TEXT", nullable: true),
                    Marte4 = table.Column<string>(type: "TEXT", nullable: true),
                    Marte5 = table.Column<string>(type: "TEXT", nullable: true),
                    Marte6 = table.Column<string>(type: "TEXT", nullable: true),
                    Merkure1 = table.Column<string>(type: "TEXT", nullable: true),
                    Merkure2 = table.Column<string>(type: "TEXT", nullable: true),
                    Merkure3 = table.Column<string>(type: "TEXT", nullable: true),
                    Merkure4 = table.Column<string>(type: "TEXT", nullable: true),
                    Merkure5 = table.Column<string>(type: "TEXT", nullable: true),
                    Merkure6 = table.Column<string>(type: "TEXT", nullable: true),
                    Enjte1 = table.Column<string>(type: "TEXT", nullable: true),
                    Enjte2 = table.Column<string>(type: "TEXT", nullable: true),
                    Enjte3 = table.Column<string>(type: "TEXT", nullable: true),
                    Enjte4 = table.Column<string>(type: "TEXT", nullable: true),
                    Enjte5 = table.Column<string>(type: "TEXT", nullable: true),
                    Enjte6 = table.Column<string>(type: "TEXT", nullable: true),
                    Premte1 = table.Column<string>(type: "TEXT", nullable: true),
                    Premte2 = table.Column<string>(type: "TEXT", nullable: true),
                    Premte3 = table.Column<string>(type: "TEXT", nullable: true),
                    Premte4 = table.Column<string>(type: "TEXT", nullable: true),
                    Premte5 = table.Column<string>(type: "TEXT", nullable: true),
                    Premte6 = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Oraret", x => x.OrariId);
                });

            migrationBuilder.CreateTable(
                name: "Paralelet",
                columns: table => new
                {
                    ParaleljaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Numri = table.Column<int>(type: "INTEGER", nullable: false),
                    KapacitetiMax = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paralelet", x => x.ParaleljaId);
                });

            migrationBuilder.CreateTable(
                name: "Postimet",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Titulli = table.Column<string>(type: "TEXT", nullable: true),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Permbajtja = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Postimet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Prinderit",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    DisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    DataLindjes = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prinderit", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sallat",
                columns: table => new
                {
                    SallaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    EmriSalles = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sallat", x => x.SallaId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Laburatioret",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Lloji = table.Column<string>(type: "TEXT", nullable: true),
                    NrPaisjeve = table.Column<int>(type: "INTEGER", nullable: false),
                    DataEKrijimit = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LendaId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Laburatioret", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Laburatioret_Lendet_LendaId",
                        column: x => x.LendaId,
                        principalTable: "Lendet",
                        principalColumn: "LendaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Librat",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Titulli = table.Column<string>(type: "TEXT", nullable: true),
                    Autori = table.Column<string>(type: "TEXT", nullable: true),
                    Linku = table.Column<string>(type: "TEXT", nullable: true),
                    LendaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    LendaString = table.Column<string>(type: "TEXT", nullable: true),
                    Klasa = table.Column<string>(type: "TEXT", nullable: true),
                    Pershkrimi = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Librat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Librat_Lendet_LendaId",
                        column: x => x.LendaId,
                        principalTable: "Lendet",
                        principalColumn: "LendaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Familjet",
                columns: table => new
                {
                    FamiljaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    PrindiId = table.Column<string>(type: "TEXT", nullable: true),
                    NxenesiId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Familjet", x => x.FamiljaId);
                    table.ForeignKey(
                        name: "FK_Familjet_Nxenesit_NxenesiId",
                        column: x => x.NxenesiId,
                        principalTable: "Nxenesit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Familjet_Prinderit_PrindiId",
                        column: x => x.PrindiId,
                        principalTable: "Prinderit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Kontaktet",
                columns: table => new
                {
                    KontaktiId = table.Column<Guid>(type: "TEXT", nullable: false),
                    PrindiId = table.Column<string>(type: "TEXT", nullable: true),
                    profEmail = table.Column<string>(type: "TEXT", nullable: true),
                    Subjekti = table.Column<string>(type: "TEXT", nullable: true),
                    Mesazhi = table.Column<string>(type: "TEXT", nullable: true),
                    DataEDergimit = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kontaktet", x => x.KontaktiId);
                    table.ForeignKey(
                        name: "FK_Kontaktet_Prinderit_PrindiId",
                        column: x => x.PrindiId,
                        principalTable: "Prinderit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Klasat",
                columns: table => new
                {
                    KlasaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Viti = table.Column<int>(type: "INTEGER", nullable: false),
                    ParaleljaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    SallaId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klasat", x => x.KlasaId);
                    table.ForeignKey(
                        name: "FK_Klasat_Paralelet_ParaleljaId",
                        column: x => x.ParaleljaId,
                        principalTable: "Paralelet",
                        principalColumn: "ParaleljaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Klasat_Sallat_SallaId",
                        column: x => x.SallaId,
                        principalTable: "Sallat",
                        principalColumn: "SallaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pajisjet",
                columns: table => new
                {
                    PajisjaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    kodiProduktit = table.Column<string>(type: "TEXT", nullable: true),
                    emriPajisjes = table.Column<string>(type: "TEXT", nullable: true),
                    DataEShtimit = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LaburatioriId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pajisjet", x => x.PajisjaId);
                    table.ForeignKey(
                        name: "FK_Pajisjet_Laburatioret_LaburatioriId",
                        column: x => x.LaburatioriId,
                        principalTable: "Laburatioret",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Profesoret",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    GradaAkademike = table.Column<string>(type: "TEXT", nullable: true),
                    DataRegjistrimit = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LendaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    KlasaKujdestariKlasaId = table.Column<Guid>(type: "TEXT", nullable: true),
                    UserName = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profesoret", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Profesoret_Klasat_KlasaKujdestariKlasaId",
                        column: x => x.KlasaKujdestariKlasaId,
                        principalTable: "Klasat",
                        principalColumn: "KlasaId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Profesoret_Lendet_LendaId",
                        column: x => x.LendaId,
                        principalTable: "Lendet",
                        principalColumn: "LendaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FeedbackToNxenesit",
                columns: table => new
                {
                    FeedbackID = table.Column<Guid>(type: "TEXT", nullable: false),
                    ProfesoriID = table.Column<string>(type: "TEXT", nullable: true),
                    NxenesiEmail = table.Column<string>(type: "TEXT", nullable: true),
                    Subject = table.Column<string>(type: "TEXT", nullable: true),
                    Message = table.Column<string>(type: "TEXT", nullable: true),
                    MessageSentDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedbackToNxenesit", x => x.FeedbackID);
                    table.ForeignKey(
                        name: "FK_FeedbackToNxenesit_Profesoret_ProfesoriID",
                        column: x => x.ProfesoriID,
                        principalTable: "Profesoret",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProfesoriKlasa",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ProfId = table.Column<string>(type: "TEXT", nullable: true),
                    KlasaId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfesoriKlasa", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProfesoriKlasa_Klasat_KlasaId",
                        column: x => x.KlasaId,
                        principalTable: "Klasat",
                        principalColumn: "KlasaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProfesoriKlasa_Profesoret_ProfId",
                        column: x => x.ProfId,
                        principalTable: "Profesoret",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Vleresimi",
                columns: table => new
                {
                    VleresimiId = table.Column<Guid>(type: "TEXT", nullable: false),
                    NxenesiId = table.Column<string>(type: "TEXT", nullable: true),
                    ProfesoriId = table.Column<string>(type: "TEXT", nullable: true),
                    Nota = table.Column<string>(type: "TEXT", nullable: true),
                    Lenda = table.Column<string>(type: "TEXT", nullable: true),
                    Gjysemvjetori = table.Column<string>(type: "TEXT", nullable: true),
                    Viti = table.Column<string>(type: "TEXT", nullable: true),
                    DataRegjistrimit = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vleresimi", x => x.VleresimiId);
                    table.ForeignKey(
                        name: "FK_Vleresimi_Nxenesit_NxenesiId",
                        column: x => x.NxenesiId,
                        principalTable: "Nxenesit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Vleresimi_Profesoret_ProfesoriId",
                        column: x => x.ProfesoriId,
                        principalTable: "Profesoret",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Familjet_NxenesiId",
                table: "Familjet",
                column: "NxenesiId");

            migrationBuilder.CreateIndex(
                name: "IX_Familjet_PrindiId",
                table: "Familjet",
                column: "PrindiId");

            migrationBuilder.CreateIndex(
                name: "IX_FeedbackToNxenesit_ProfesoriID",
                table: "FeedbackToNxenesit",
                column: "ProfesoriID");

            migrationBuilder.CreateIndex(
                name: "IX_Klasat_ParaleljaId",
                table: "Klasat",
                column: "ParaleljaId");

            migrationBuilder.CreateIndex(
                name: "IX_Klasat_SallaId",
                table: "Klasat",
                column: "SallaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Kontaktet_PrindiId",
                table: "Kontaktet",
                column: "PrindiId");

            migrationBuilder.CreateIndex(
                name: "IX_Laburatioret_LendaId",
                table: "Laburatioret",
                column: "LendaId");

            migrationBuilder.CreateIndex(
                name: "IX_Librat_LendaId",
                table: "Librat",
                column: "LendaId");

            migrationBuilder.CreateIndex(
                name: "IX_Pajisjet_LaburatioriId",
                table: "Pajisjet",
                column: "LaburatioriId");

            migrationBuilder.CreateIndex(
                name: "IX_Profesoret_KlasaKujdestariKlasaId",
                table: "Profesoret",
                column: "KlasaKujdestariKlasaId");

            migrationBuilder.CreateIndex(
                name: "IX_Profesoret_LendaId",
                table: "Profesoret",
                column: "LendaId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfesoriKlasa_KlasaId",
                table: "ProfesoriKlasa",
                column: "KlasaId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfesoriKlasa_ProfId",
                table: "ProfesoriKlasa",
                column: "ProfId");

            migrationBuilder.CreateIndex(
                name: "IX_Vleresimi_NxenesiId",
                table: "Vleresimi",
                column: "NxenesiId");

            migrationBuilder.CreateIndex(
                name: "IX_Vleresimi_ProfesoriId",
                table: "Vleresimi",
                column: "ProfesoriId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aktivitetet");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Autobusat");

            migrationBuilder.DropTable(
                name: "Familjet");

            migrationBuilder.DropTable(
                name: "FeedbackToNxenesit");

            migrationBuilder.DropTable(
                name: "Kontaktet");

            migrationBuilder.DropTable(
                name: "Librat");

            migrationBuilder.DropTable(
                name: "Njoftimet");

            migrationBuilder.DropTable(
                name: "Oraret");

            migrationBuilder.DropTable(
                name: "Pajisjet");

            migrationBuilder.DropTable(
                name: "Postimet");

            migrationBuilder.DropTable(
                name: "ProfesoriKlasa");

            migrationBuilder.DropTable(
                name: "Vleresimi");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Prinderit");

            migrationBuilder.DropTable(
                name: "Laburatioret");

            migrationBuilder.DropTable(
                name: "Nxenesit");

            migrationBuilder.DropTable(
                name: "Profesoret");

            migrationBuilder.DropTable(
                name: "Klasat");

            migrationBuilder.DropTable(
                name: "Lendet");

            migrationBuilder.DropTable(
                name: "Paralelet");

            migrationBuilder.DropTable(
                name: "Sallat");
        }
    }
}
