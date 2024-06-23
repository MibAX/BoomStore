using MB.BoomStore.Entities.Customers;
using MB.BoomStore.Utilities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace MB.BoomStore.Entities.Orders
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

        [Column(TypeName = "decimal(12,4)")]
        public decimal TotalPrice { get; set; }
        public string? Note { get; set; }
        public List<OrderProduct> OrderProducts { get; set; } = [];


        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}