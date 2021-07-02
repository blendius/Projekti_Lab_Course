using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class LendaLab : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lenda",
                table: "Laburatioret");

            migrationBuilder.AddColumn<Guid>(
                name: "LendaId",
                table: "Laburatioret",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Laburatioret_LendaId",
                table: "Laburatioret",
                column: "LendaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Laburatioret_Lendet_LendaId",
                table: "Laburatioret",
                column: "LendaId",
                principalTable: "Lendet",
                principalColumn: "LendaId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Laburatioret_Lendet_LendaId",
                table: "Laburatioret");

            migrationBuilder.DropIndex(
                name: "IX_Laburatioret_LendaId",
                table: "Laburatioret");

            migrationBuilder.DropColumn(
                name: "LendaId",
                table: "Laburatioret");

            migrationBuilder.AddColumn<string>(
                name: "Lenda",
                table: "Laburatioret",
                type: "TEXT",
                nullable: true);
        }
    }
}
