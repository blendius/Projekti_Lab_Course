using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class delete2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FeedbackToNxenesit_Profesoret_ProfesoriID",
                table: "FeedbackToNxenesit");

            migrationBuilder.DropForeignKey(
                name: "FK_Kontaktet_Profesoret_ProfesoriId",
                table: "Kontaktet");

            migrationBuilder.AddForeignKey(
                name: "FK_FeedbackToNxenesit_Profesoret_ProfesoriID",
                table: "FeedbackToNxenesit",
                column: "ProfesoriID",
                principalTable: "Profesoret",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Kontaktet_Profesoret_ProfesoriId",
                table: "Kontaktet",
                column: "ProfesoriId",
                principalTable: "Profesoret",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FeedbackToNxenesit_Profesoret_ProfesoriID",
                table: "FeedbackToNxenesit");

            migrationBuilder.DropForeignKey(
                name: "FK_Kontaktet_Profesoret_ProfesoriId",
                table: "Kontaktet");

            migrationBuilder.AddForeignKey(
                name: "FK_FeedbackToNxenesit_Profesoret_ProfesoriID",
                table: "FeedbackToNxenesit",
                column: "ProfesoriID",
                principalTable: "Profesoret",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Kontaktet_Profesoret_ProfesoriId",
                table: "Kontaktet",
                column: "ProfesoriId",
                principalTable: "Profesoret",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
