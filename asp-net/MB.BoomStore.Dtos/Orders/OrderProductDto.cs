using MB.BoomStore.Dtos.Products;

namespace MB.BoomStore.Dtos.Orders
{
    public class OrderProductDto
    {
        public ProductDto Product { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
    }
}
