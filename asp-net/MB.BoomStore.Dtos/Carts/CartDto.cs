using MB.BoomStore.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MB.BoomStore.Dtos.Carts
{
    public class CartDto
    {
        public int Id { get; set; }

        [Column(TypeName = "decimal(12,4)")]
        public decimal TotalPrice { get; set; }
        public string? Note { get; set; }

        public CartStatus CartStatus { get; set; }

        public List<CartItemDto> CartItems { get; set; } = [];
    }
}
