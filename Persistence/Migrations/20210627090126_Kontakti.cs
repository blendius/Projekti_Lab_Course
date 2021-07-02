using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Kontakti : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kontaktet",
                columns: table => new
                {
                    KontaktiId = table.Column<Guid>(type: "TEXT", nullable: false),
                    profEmail = table.Column<string>(type: "TEXT", nullable: true),
                    Subjelti = table.Column<string>(type: "TEXT", nullable: true),
                    Mesazhi = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kontaktet", x => x.KontaktiId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kontaktet");
        }
    }
}
