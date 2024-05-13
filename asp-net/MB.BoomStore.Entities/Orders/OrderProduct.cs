using MB.BoomStore.Entities.Products;

namespace MB.BoomStore.Entities.Orders
{
    public class OrderProduct
    {
        public int ProductId { get; set; }
        public required Product Product { get; set; }

        public int OrderId { get; set; }
        public required Order Order { get; set; }

        public int Quantity { get; set; } = 1;

    }
}
