using MB.BoomStore.Entities.Products;
using MB.BoomStore.Utilities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace MB.BoomStore.Entities.Orders
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

        [Column(TypeName = "decimal(6,2)")]
        public decimal TotalPrice { get; set; }
        public string? Note { get; set; }
        public List<OrderProduct> OrderProducts { get; set; } = [];
    }
}