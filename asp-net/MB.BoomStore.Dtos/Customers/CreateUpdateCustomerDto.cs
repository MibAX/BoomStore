using MB.BoomStore.Utilities.Enums;

namespace MB.BoomStore.Dtos.Customers
{
    public class CreateUpdateCustomerDto
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
    }
}
