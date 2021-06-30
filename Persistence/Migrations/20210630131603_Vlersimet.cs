using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Vlersimet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Vleresimi",
                columns: table => new
                {
                    NxenesiId = table.Column<string>(type: "TEXT", nullable: false),
                    ProfesoriId = table.Column<string>(type: "TEXT", nullable: false),
                    Nota = table.Column<string>(type: "TEXT", nullable: true),
                    Lenda = table.Column<string>(type: "TEXT", nullable: true),
                    Gjysemvjetori = table.Column<string>(type: "TEXT", nullable: true),
                    Viti = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vleresimi", x => new { x.ProfesoriId, x.NxenesiId });
                    table.ForeignKey(
                        name: "FK_Vleresimi_Nxenesit_NxenesiId",
                        column: x => x.NxenesiId,
                        principalTable: "Nxenesit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Vleresimi_Profesoret_ProfesoriId",
                        column: x => x.ProfesoriId,
                        principalTable: "Profesoret",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vleresimi_NxenesiId",
                table: "Vleresimi",
                column: "NxenesiId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vleresimi");
        }
    }
}
