using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Laburatori : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Laburatioret",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Lloji = table.Column<string>(type: "TEXT", nullable: true),
                    NrPaisjeve = table.Column<int>(type: "INTEGER", nullable: false),
                    DataEKrijimit = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Lenda = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Laburatioret", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Laburatioret");
        }
    }
}
