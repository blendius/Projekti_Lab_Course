using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class test123125125 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lendet_Syllabuset_SyllabusiId",
                table: "Lendet");

            migrationBuilder.RenameColumn(
                name: "SyllabusiId",
                table: "Lendet",
                newName: "SyllabusiID");

            migrationBuilder.RenameIndex(
                name: "IX_Lendet_SyllabusiId",
                table: "Lendet",
                newName: "IX_Lendet_SyllabusiID");

            migrationBuilder.AlterColumn<Guid>(
                name: "SyllabusiID",
                table: "Lendet",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Lendet_Syllabuset_SyllabusiID",
                table: "Lendet",
                column: "SyllabusiID",
                principalTable: "Syllabuset",
                principalColumn: "SyllabusiId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lendet_Syllabuset_SyllabusiID",
                table: "Lendet");

            migrationBuilder.RenameColumn(
                name: "SyllabusiID",
                table: "Lendet",
                newName: "SyllabusiId");

            migrationBuilder.RenameIndex(
                name: "IX_Lendet_SyllabusiID",
                table: "Lendet",
                newName: "IX_Lendet_SyllabusiId");

            migrationBuilder.AlterColumn<Guid>(
                name: "SyllabusiId",
                table: "Lendet",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_Lendet_Syllabuset_SyllabusiId",
                table: "Lendet",
                column: "SyllabusiId",
                principalTable: "Syllabuset",
                principalColumn: "SyllabusiId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
