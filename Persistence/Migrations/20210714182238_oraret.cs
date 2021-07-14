using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class oraret : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmriOrarit",
                table: "Oraret");

            migrationBuilder.AddColumn<Guid>(
                name: "KlasaID",
                table: "Oraret",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Oraret_KlasaID",
                table: "Oraret",
                column: "KlasaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Oraret_Klasat_KlasaID",
                table: "Oraret",
                column: "KlasaID",
                principalTable: "Klasat",
                principalColumn: "KlasaId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Oraret_Klasat_KlasaID",
                table: "Oraret");

            migrationBuilder.DropIndex(
                name: "IX_Oraret_KlasaID",
                table: "Oraret");

            migrationBuilder.DropColumn(
                name: "KlasaID",
                table: "Oraret");

            migrationBuilder.AddColumn<string>(
                name: "EmriOrarit",
                table: "Oraret",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
