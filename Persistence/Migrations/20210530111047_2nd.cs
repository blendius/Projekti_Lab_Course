using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class _2nd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lendet",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Emri = table.Column<string>(type: "TEXT", nullable: true),
                    Permbajtja = table.Column<string>(type: "TEXT", nullable: true),
                    Syllabusi = table.Column<string>(type: "TEXT", nullable: true),
                    DataKrijimit = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lendet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Terminet",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    LendaId = table.Column<Guid>(type: "TEXT", nullable: true),
                    DataFillimit = table.Column<string>(type: "TEXT", nullable: true),
                    DataMbarimit = table.Column<string>(type: "TEXT", nullable: true),
                    Salla = table.Column<string>(type: "TEXT", nullable: true),
                    KohaMbajtjes = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terminet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Terminet_Lendet_LendaId",
                        column: x => x.LendaId,
                        principalTable: "Lendet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Terminet_LendaId",
                table: "Terminet",
                column: "LendaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Terminet");

            migrationBuilder.DropTable(
                name: "Lendet");
        }
    }
}
