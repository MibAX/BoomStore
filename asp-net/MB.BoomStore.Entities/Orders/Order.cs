using MB.BoomStore.Entities.Products;

namespace MB.BoomStore.Entities.Orders
{
    public class Order
    {
        public int Id { get; set; }



        public List<Product> Products { get; set; } = [];
    }
}