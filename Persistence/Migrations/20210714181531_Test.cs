using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasProjector",
                table: "Sallat",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Kati",
                table: "Sallat",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NrUleseve",
                table: "Sallat",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KapacitetiMin",
                table: "Paralelet",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasProjector",
                table: "Sallat");

            migrationBuilder.DropColumn(
                name: "Kati",
                table: "Sallat");

            migrationBuilder.DropColumn(
                name: "NrUleseve",
                table: "Sallat");

            migrationBuilder.DropColumn(
                name: "KapacitetiMin",
                table: "Paralelet");
        }
    }
}
