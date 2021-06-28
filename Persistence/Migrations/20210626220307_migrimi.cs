using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class migrimi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Paralelet",
                columns: table => new
                {
                    ParaleljaId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    KapacitetiMax = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paralelet", x => x.ParaleljaId);
                });

            migrationBuilder.CreateTable(
                name: "PrindiNxenesi",
                columns: table => new
                {
                    PrindiId = table.Column<string>(type: "TEXT", nullable: false),
                    NxenesiId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrindiNxenesi", x => new { x.PrindiId, x.NxenesiId });
                    table.ForeignKey(
                        name: "FK_PrindiNxenesi_Nxenesit_NxenesiId",
                        column: x => x.NxenesiId,
                        principalTable: "Nxenesit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PrindiNxenesi_Prinderit_PrindiId",
                        column: x => x.PrindiId,
                        principalTable: "Prinderit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vitet",
                columns: table => new
                {
                    VitiId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Kohezgjatja = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vitet", x => x.VitiId);
                });

            migrationBuilder.CreateTable(
                name: "Klasat",
                columns: table => new
                {
                    VitiId = table.Column<int>(type: "INTEGER", nullable: false),
                    ParaleljaId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klasat", x => new { x.VitiId, x.ParaleljaId });
                    table.ForeignKey(
                        name: "FK_Klasat_Paralelet_ParaleljaId",
                        column: x => x.ParaleljaId,
                        principalTable: "Paralelet",
                        principalColumn: "ParaleljaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Klasat_Vitet_VitiId",
                        column: x => x.VitiId,
                        principalTable: "Vitet",
                        principalColumn: "VitiId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Klasat_ParaleljaId",
                table: "Klasat",
                column: "ParaleljaId");

            migrationBuilder.CreateIndex(
                name: "IX_PrindiNxenesi_NxenesiId",
                table: "PrindiNxenesi",
                column: "NxenesiId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Klasat");

            migrationBuilder.DropTable(
                name: "PrindiNxenesi");

            migrationBuilder.DropTable(
                name: "Paralelet");

            migrationBuilder.DropTable(
                name: "Vitet");
        }
    }
}
