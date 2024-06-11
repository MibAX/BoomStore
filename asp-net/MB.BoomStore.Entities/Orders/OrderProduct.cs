using MB.BoomStore.Entities.Products;

namespace MB.BoomStore.Entities.Orders
{
    public class OrderProduct
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int Quantity { get; set; } = 1;

    }
}
