using MB.BoomStore.Utilities.Enums;

namespace MB.BoomStore.Dtos.Customers
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public required string FullName { get; set; }
        public required string PhoneNumber { get; set; }
        public Gender Gender { get; set; }
        public int Age { get; set; }
    }
}
