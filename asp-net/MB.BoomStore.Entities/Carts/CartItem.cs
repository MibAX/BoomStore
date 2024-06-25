using MB.BoomStore.Entities.Products;

namespace MB.BoomStore.Entities.Carts
{
    public class CartItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
}