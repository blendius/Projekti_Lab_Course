using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class delete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProfesoriKlasa_Profesoret_ProfId",
                table: "ProfesoriKlasa");

            migrationBuilder.AddForeignKey(
                name: "FK_ProfesoriKlasa_Profesoret_ProfId",
                table: "ProfesoriKlasa",
                column: "ProfId",
                principalTable: "Profesoret",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProfesoriKlasa_Profesoret_ProfId",
                table: "ProfesoriKlasa");

            migrationBuilder.AddForeignKey(
                name: "FK_ProfesoriKlasa_Profesoret_ProfId",
                table: "ProfesoriKlasa",
                column: "ProfId",
                principalTable: "Profesoret",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
