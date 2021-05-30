using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ProfUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Fjalkalimi",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fjalkalimi",
                table: "Profesoret");

            migrationBuilder.DropColumn(
                name: "Roli",
                table: "Profesoret");
        }
    }
}
