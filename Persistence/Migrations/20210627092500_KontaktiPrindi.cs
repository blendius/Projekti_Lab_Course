using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class KontaktiPrindi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PrindiId",
                table: "Kontaktet",
                type: "TEXT",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Kontaktet_Prinderit_PrindiId",
                table: "Kontaktet");

            migrationBuilder.DropIndex(
                name: "IX_Kontaktet_PrindiId",
                table: "Kontaktet");

            migrationBuilder.DropColumn(
                name: "PrindiId",
                table: "Kontaktet");
        }
    }
}
