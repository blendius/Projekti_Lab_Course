using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class LendaProfesoriRel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LendaProfesori");

            migrationBuilder.AddColumn<Guid>(
                name: "LendaId",
                table: "Profesoret",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Profesoret_LendaId",
                table: "Profesoret",
                column: "LendaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Profesoret_Lendet_LendaId",
                table: "Profesoret",
                column: "LendaId",
                principalTable: "Lendet",
                principalColumn: "LendaId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profesoret_Lendet_LendaId",
                table: "Profesoret");

            migrationBuilder.DropIndex(
                name: "IX_Profesoret_LendaId",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "LendaId",
                table: "Profesoret");

            migrationBuilder.CreateTable(
                name: "LendaProfesori",
                columns: table => new
                {
                    LendetLendaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ProfesoretId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LendaProfesori", x => new { x.LendetLendaId, x.ProfesoretId });
                    table.ForeignKey(
                        name: "FK_LendaProfesori_Lendet_LendetLendaId",
                        column: x => x.LendetLendaId,
                        principalTable: "Lendet",
                        principalColumn: "LendaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LendaProfesori_Profesoret_ProfesoretId",
                        column: x => x.ProfesoretId,
                        principalTable: "Profesoret",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LendaProfesori_ProfesoretId",
                table: "LendaProfesori",
                column: "ProfesoretId");
        }
    }
}
