using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Aktiviteti : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aktivitetet_Sallat_SallaId",
                table: "Aktivitetet");

            migrationBuilder.DropIndex(
                name: "IX_Aktivitetet_SallaId",
                table: "Aktivitetet");

            migrationBuilder.DropColumn(
                name: "SallaId",
                table: "Aktivitetet");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SallaId",
                table: "Aktivitetet",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Aktivitetet_SallaId",
                table: "Aktivitetet",
                column: "SallaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Aktivitetet_Sallat_SallaId",
                table: "Aktivitetet",
                column: "SallaId",
                principalTable: "Sallat",
                principalColumn: "SallaId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
