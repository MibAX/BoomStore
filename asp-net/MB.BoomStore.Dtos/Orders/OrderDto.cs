using MB.BoomStore.Utilities.Enums;
using System.ComponentModel.DataAnnotations.Schema;
namespace MB.BoomStore.Dtos.Orders
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public string? Note { get; set; }

        [Column(TypeName = "decimal(12,4)")]
        public decimal TotalPrice { get; set; }
        public string CustomerFullName { get; set; }
    }
}
