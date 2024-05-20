using MB.BoomStore.Dtos.Categories;
using System.ComponentModel.DataAnnotations.Schema;

namespace MB.BoomStore.Dtos.Products
{
    public class ProductDetailsDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string BarCode { get; set; }
        public int Rating { get; set; } = 0;

        [Column(TypeName = "decimal(6,2)")]
        public decimal Price { get; set; }
        public required CategoryDto Category { get; set; }
    }
}
