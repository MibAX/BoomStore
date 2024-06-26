using MB.BoomStore.Entities.Customers;
using MB.BoomStore.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.BoomStore.Entities.Carts
{
    public class Cart
    {
        public int Id { get; set; }

        [Column(TypeName = "decimal(12,4)")]
        public decimal TotalPrice { get; set; }
        public string? Note { get; set; }

        public CartStatus CartStatus { get; set; } = CartStatus.Open;

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public List<CartItem> CartItems { get; set; } = [];
    }
}
