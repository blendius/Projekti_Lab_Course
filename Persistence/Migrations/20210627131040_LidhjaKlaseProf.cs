using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class LidhjaKlaseProf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfesoriId",
                table: "Klasat",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Klasat_ProfesoriId",
                table: "Klasat",
                column: "ProfesoriId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Klasat_Profesoret_ProfesoriId",
                table: "Klasat",
                column: "ProfesoriId",
                principalTable: "Profesoret",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Klasat_Profesoret_ProfesoriId",
                table: "Klasat");

            migrationBuilder.DropIndex(
                name: "IX_Klasat_ProfesoriId",
                table: "Klasat");

            migrationBuilder.DropColumn(
                name: "ProfesoriId",
                table: "Klasat");
        }
    }
}
