using MB.BoomStore.Utilities.Enums;

namespace MB.BoomStore.Dtos.Orders
{
    public class CreateUpdateOrderDto
    {
        public int Id { get; set; }
        public string? Note { get; set; }
        public int CustomerId { get; set; }

        public List<CreateUpdateOrderProductDto> OrderProducts { get; set; } = [];
    }
}
