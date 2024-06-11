using MB.BoomStore.Utilities.Enums;

namespace MB.BoomStore.Dtos.Orders
{
    public class CreateUpdateOrderDto
    {
        public int Id { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public string? Note { get; set; }
        public List<OrderProductDto> OrderProducts { get; set; } = [];
    }
}
