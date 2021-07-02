using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Kontakt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kontaktet_Prinderit_PrindiId",
                table: "Kontaktet");

            migrationBuilder.DropIndex(
                name: "IX_Kontaktet_PrindiId",
                table: "Kontaktet");

            migrationBuilder.RenameColumn(
                name: "Subjelti",
                table: "Kontaktet",
                newName: "UserName");

            migrationBuilder.RenameColumn(
                name: "PrindiId",
                table: "Kontaktet",
                newName: "Subjekti");

            migrationBuilder.CreateIndex(
                name: "IX_Kontaktet_UserName",
                table: "Kontaktet",
                column: "UserName");

            migrationBuilder.AddForeignKey(
                name: "FK_Kontaktet_Prinderit_UserName",
                table: "Kontaktet",
                column: "UserName",
                principalTable: "Prinderit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kontaktet_Prinderit_UserName",
                table: "Kontaktet");

            migrationBuilder.DropIndex(
                name: "IX_Kontaktet_UserName",
                table: "Kontaktet");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Kontaktet",
                newName: "Subjelti");

            migrationBuilder.RenameColumn(
                name: "Subjekti",
                table: "Kontaktet",
                newName: "PrindiId");

            migrationBuilder.CreateIndex(
                name: "IX_Kontaktet_PrindiId",
                table: "Kontaktet",
                column: "PrindiId");

            migrationBuilder.AddForeignKey(
                name: "FK_Kontaktet_Prinderit_PrindiId",
                table: "Kontaktet",
                column: "PrindiId",
                principalTable: "Prinderit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
