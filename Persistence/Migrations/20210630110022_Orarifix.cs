using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Orarifix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Oraret");
        }
    }
}
