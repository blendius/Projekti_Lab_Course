using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class FeedbackRating2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FeedbackToNxenesit",
                columns: table => new
                {
                    FeedbackID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProfesoriId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    NxenesiEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    MessageSentDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedbackToNxenesit", x => x.FeedbackID);
                    table.ForeignKey(
                        name: "FK_FeedbackToNxenesit_Profesoret_ProfesoriId",
                        column: x => x.ProfesoriId,
                        principalTable: "Profesoret",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeedbackToNxenesit_ProfesoriId",
                table: "FeedbackToNxenesit",
                column: "ProfesoriId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeedbackToNxenesit");
        }
    }
}
