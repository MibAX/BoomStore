using MB.BoomStore.Entities.Products;
using System.ComponentModel.DataAnnotations.Schema;

namespace MB.BoomStore.Entities.Carts
{
    public class CartItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }


        [NotMapped]
        [Column(TypeName = "decimal(12,4)")]
        public decimal CartItemPrice { 
            get
            {
                return Product.Price * Quantity;
            }
        }
    }
}