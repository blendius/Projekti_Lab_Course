using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PrindIdentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "nrTel",
                table: "Prinderit",
                newName: "TwoFactorEnabled");

            migrationBuilder.RenameColumn(
                name: "Mbiemri",
                table: "Prinderit",
                newName: "UserName");

            migrationBuilder.RenameColumn(
                name: "Fjalkalimi",
                table: "Prinderit",
                newName: "SecurityStamp");

            migrationBuilder.RenameColumn(
                name: "Emri",
                table: "Prinderit",
                newName: "PhoneNumber");

            migrationBuilder.AddColumn<int>(
                name: "AccessFailedCount",
                table: "Prinderit",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "Prinderit",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataLindjes",
                table: "Prinderit",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "EmailConfirmed",
                table: "Prinderit",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "LockoutEnabled",
                table: "Prinderit",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LockoutEnd",
                table: "Prinderit",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedEmail",
                table: "Prinderit",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedUserName",
                table: "Prinderit",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Prinderit",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PhoneNumberConfirmed",
                table: "Prinderit",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccessFailedCount",
                table: "Prinderit");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "Prinderit");

            migrationBuilder.DropColumn(
                name: "DataLindjes",
                table: "Prinderit");

            migrationBuilder.DropColumn(
                name: "EmailConfirmed",
                table: "Prinderit");

            migrationBuilder.DropColumn(
                name: "LockoutEnabled",
                table: "Prinderit");

            migrationBuilder.DropColumn(
                name: "LockoutEnd",
                table: "Prinderit");

            migrationBuilder.DropColumn(
                name: "NormalizedEmail",
                table: "Prinderit");

            migrationBuilder.DropColumn(
                name: "NormalizedUserName",
                table: "Prinderit");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Prinderit");

            migrationBuilder.DropColumn(
                name: "PhoneNumberConfirmed",
                table: "Prinderit");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Prinderit",
                newName: "Mbiemri");

            migrationBuilder.RenameColumn(
                name: "TwoFactorEnabled",
                table: "Prinderit",
                newName: "nrTel");

            migrationBuilder.RenameColumn(
                name: "SecurityStamp",
                table: "Prinderit",
                newName: "Fjalkalimi");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Prinderit",
                newName: "Emri");
        }
    }
}
