using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class merge1 : Migration
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
                    EmriSalles = table.Column<string>(type: "TEXT", nullable: true),
                    SallaId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aktivitetet", x => x.AktivitetiId);
                    table.ForeignKey(
                        name: "FK_Aktivitetet_Sallat_SallaId",
                        column: x => x.SallaId,
                        principalTable: "Sallat",
                        principalColumn: "SallaId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Aktivitetet_SallaId",
                table: "Aktivitetet",
                column: "SallaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aktivitetet");
        }
    }
}
