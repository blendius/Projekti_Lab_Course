using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class orariDone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Terminet");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Terminet",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    DataFillimit = table.Column<string>(type: "TEXT", nullable: true),
                    DataMbarimit = table.Column<string>(type: "TEXT", nullable: true),
                    KohaMbajtjes = table.Column<string>(type: "TEXT", nullable: true),
                    Salla = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terminet", x => x.Id);
                });
        }
    }
}
