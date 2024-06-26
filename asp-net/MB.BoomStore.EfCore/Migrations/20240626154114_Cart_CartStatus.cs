using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MB.BoomStore.EfCore.Migrations
{
    /// <inheritdoc />
    public partial class Cart_CartStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CartStatus",
                table: "Carts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CartStatus",
                table: "Carts");
        }
    }
}
