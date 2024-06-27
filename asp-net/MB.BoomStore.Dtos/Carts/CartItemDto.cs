using MB.BoomStore.Dtos.Products;
using System.ComponentModel.DataAnnotations.Schema;

namespace MB.BoomStore.Dtos.Carts
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public ProductDto Product { get; set; }
        public int Quantity { get; set; }


        [Column(TypeName = "decimal(12,4)")]
        public decimal CartItemPrice { get; set; }
    }
}
