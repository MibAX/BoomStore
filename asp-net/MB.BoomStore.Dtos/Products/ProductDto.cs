using System.ComponentModel.DataAnnotations.Schema;

namespace MB.BoomStore.Dtos.Products
{
    public class ProductDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string BarCode { get; set; }
        public int Rating { get; set; } = 0;

        [Column(TypeName = "decimal(12,4)")]
        public decimal Price { get; set; }
        public required string CategoryName { get; set; }
    }
}
