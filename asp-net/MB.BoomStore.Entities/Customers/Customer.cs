using MB.BoomStore.Entities.Orders;
using MB.BoomStore.Utilities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace MB.BoomStore.Entities.Customers
{
    public class Customer
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }

        public List<Order> Orders { get; set; } = [];


        [NotMapped]
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }

        [NotMapped]
        public int Age
        {
            get
            {
                return DateTime.Now.Year - DateOfBirth.Year;
            }
        }
    }
}
