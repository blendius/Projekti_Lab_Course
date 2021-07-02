using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Kontaktii : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kontaktet_Prinderit_UserName",
                table: "Kontaktet");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Kontaktet",
                newName: "PrindiId");

            migrationBuilder.RenameIndex(
                name: "IX_Kontaktet_UserName",
                table: "Kontaktet",
                newName: "IX_Kontaktet_PrindiId");

            migrationBuilder.AddForeignKey(
                name: "FK_Kontaktet_Prinderit_PrindiId",
                table: "Kontaktet",
                column: "PrindiId",
                principalTable: "Prinderit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kontaktet_Prinderit_PrindiId",
                table: "Kontaktet");

            migrationBuilder.RenameColumn(
                name: "PrindiId",
                table: "Kontaktet",
                newName: "UserName");

            migrationBuilder.RenameIndex(
                name: "IX_Kontaktet_PrindiId",
                table: "Kontaktet",
                newName: "IX_Kontaktet_UserName");

            migrationBuilder.AddForeignKey(
                name: "FK_Kontaktet_Prinderit_UserName",
                table: "Kontaktet",
                column: "UserName",
                principalTable: "Prinderit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
