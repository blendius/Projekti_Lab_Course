using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ProfIdentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Fjalkalimi",
                table: "Profesoret",
                newName: "UserName");

            migrationBuilder.AddColumn<int>(
                name: "AccessFailedCount",
                table: "Profesoret",
                type: "INTEGER", 
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "Profesoret",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailConfirmed",
                table: "Profesoret",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "LockoutEnabled",
                table: "Profesoret",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LockoutEnd",
                table: "Profesoret",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedEmail",
                table: "Profesoret",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedUserName",
                table: "Profesoret",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Profesoret",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Profesoret",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PhoneNumberConfirmed",
                table: "Profesoret",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SecurityStamp",
                table: "Profesoret",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TwoFactorEnabled",
                table: "Profesoret",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccessFailedCount",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "EmailConfirmed",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "LockoutEnabled",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "LockoutEnd",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "NormalizedEmail",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "NormalizedUserName",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "PhoneNumberConfirmed",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "SecurityStamp",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "TwoFactorEnabled",
                table: "Profesoret");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Profesoret",
                newName: "Fjalkalimi");
        }
    }
}
