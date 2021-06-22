using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class LendaRoliDrop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lenda",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "Roli",
                table: "Profesoret");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Lenda",
                table: "Profesoret",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Roli",
                table: "Profesoret",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
