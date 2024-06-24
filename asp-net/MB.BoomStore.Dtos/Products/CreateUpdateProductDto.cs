using System.ComponentModel.DataAnnotations.Schema;

namespace MB.BoomStore.Dtos.Products
{
    public class CreateUpdateProductDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string BarCode { get; set; }
        public int Rating { get; set; } = 0;


        [Column(TypeName = "decimal(12,4)")]
        public decimal Price { get; set; }

        public int CategoryId { get; set; }
        public string ImageName { get; set; }
    }
}
