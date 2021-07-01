using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class test1212 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FeedbackToNxenesit",
                columns: table => new
                {
                    FeedbackID = table.Column<Guid>(type: "TEXT", nullable: false),
                    ProfesoriID = table.Column<string>(type: "TEXT", nullable: true),
                    NxenesiEmail = table.Column<string>(type: "TEXT", nullable: true),
                    Subject = table.Column<string>(type: "TEXT", nullable: true),
                    Message = table.Column<string>(type: "TEXT", nullable: true),
                    MessageSentDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedbackToNxenesit", x => x.FeedbackID);
                    table.ForeignKey(
                        name: "FK_FeedbackToNxenesit_Profesoret_ProfesoriID",
                        column: x => x.ProfesoriID,
                        principalTable: "Profesoret",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeedbackToNxenesit_ProfesoriID",
                table: "FeedbackToNxenesit",
                column: "ProfesoriID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeedbackToNxenesit");
        }
    }
}
