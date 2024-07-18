using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MockContext.Migrations
{
    /// <inheritdoc />
    public partial class init11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WordCategory_Word_CodeWord",
                table: "WordCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Word",
                table: "Word");

            migrationBuilder.RenameTable(
                name: "Word",
                newName: "Words");

            migrationBuilder.RenameColumn(
                name: "CodeWord",
                table: "WordCategory",
                newName: "WordId");

            migrationBuilder.RenameIndex(
                name: "IX_WordCategory_CodeWord",
                table: "WordCategory",
                newName: "IX_WordCategory_WordId");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Words",
                table: "Words",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WordCategory_Words_WordId",
                table: "WordCategory",
                column: "WordId",
                principalTable: "Words",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WordCategory_Words_WordId",
                table: "WordCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Words",
                table: "Words");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Words",
                newName: "Word");

            migrationBuilder.RenameColumn(
                name: "WordId",
                table: "WordCategory",
                newName: "CodeWord");

            migrationBuilder.RenameIndex(
                name: "IX_WordCategory_WordId",
                table: "WordCategory",
                newName: "IX_WordCategory_CodeWord");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Word",
                table: "Word",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WordCategory_Word_CodeWord",
                table: "WordCategory",
                column: "CodeWord",
                principalTable: "Word",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
