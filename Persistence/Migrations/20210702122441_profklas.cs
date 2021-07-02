using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class profklas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateIndex(
                name: "IX_ProfesoriKlasa_KlasaId",
                table: "ProfesoriKlasa",
                column: "KlasaId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfesoriKlasa_ProfId",
                table: "ProfesoriKlasa",
                column: "ProfId");

            migrationBuilder.AddForeignKey(
                name: "FK_Profesoret_Klasat_KlasaKujdestariKlasaId",
                table: "Profesoret",
                column: "KlasaKujdestariKlasaId",
                principalTable: "Klasat",
                principalColumn: "KlasaId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profesoret_Klasat_KlasaKujdestariKlasaId",
                table: "Profesoret");

            migrationBuilder.DropTable(
                name: "ProfesoriKlasa");
        }
    }
}
