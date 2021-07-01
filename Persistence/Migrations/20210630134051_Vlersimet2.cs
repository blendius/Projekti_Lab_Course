using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Vlersimet2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vleresimi_Nxenesit_NxenesiId",
                table: "Vleresimi");

            migrationBuilder.DropForeignKey(
                name: "FK_Vleresimi_Profesoret_ProfesoriId",
                table: "Vleresimi");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vleresimi",
                table: "Vleresimi");

            migrationBuilder.AlterColumn<string>(
                name: "NxenesiId",
                table: "Vleresimi",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "ProfesoriId",
                table: "Vleresimi",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<Guid>(
                name: "VleresimiId",
                table: "Vleresimi",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vleresimi",
                table: "Vleresimi",
                column: "VleresimiId");

            migrationBuilder.CreateIndex(
                name: "IX_Vleresimi_ProfesoriId",
                table: "Vleresimi",
                column: "ProfesoriId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vleresimi_Nxenesit_NxenesiId",
                table: "Vleresimi",
                column: "NxenesiId",
                principalTable: "Nxenesit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vleresimi_Profesoret_ProfesoriId",
                table: "Vleresimi",
                column: "ProfesoriId",
                principalTable: "Profesoret",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vleresimi_Nxenesit_NxenesiId",
                table: "Vleresimi");

            migrationBuilder.DropForeignKey(
                name: "FK_Vleresimi_Profesoret_ProfesoriId",
                table: "Vleresimi");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vleresimi",
                table: "Vleresimi");

            migrationBuilder.DropIndex(
                name: "IX_Vleresimi_ProfesoriId",
                table: "Vleresimi");

            migrationBuilder.DropColumn(
                name: "VleresimiId",
                table: "Vleresimi");

            migrationBuilder.AlterColumn<string>(
                name: "ProfesoriId",
                table: "Vleresimi",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NxenesiId",
                table: "Vleresimi",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vleresimi",
                table: "Vleresimi",
                columns: new[] { "ProfesoriId", "NxenesiId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Vleresimi_Nxenesit_NxenesiId",
                table: "Vleresimi",
                column: "NxenesiId",
                principalTable: "Nxenesit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vleresimi_Profesoret_ProfesoriId",
                table: "Vleresimi",
                column: "ProfesoriId",
                principalTable: "Profesoret",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
