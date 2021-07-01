using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class pajisja : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pajisjet",
                columns: table => new
                {
                    PajisjaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    kodiProduktit = table.Column<string>(type: "TEXT", nullable: true),
                    emriPajisjes = table.Column<string>(type: "TEXT", nullable: true),
                    DataEShtimit = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LaburatioriId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pajisjet", x => x.PajisjaId);
                    table.ForeignKey(
                        name: "FK_Pajisjet_Laburatioret_LaburatioriId",
                        column: x => x.LaburatioriId,
                        principalTable: "Laburatioret",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pajisjet_LaburatioriId",
                table: "Pajisjet",
                column: "LaburatioriId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pajisjet");
        }
    }
}
