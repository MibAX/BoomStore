﻿using MB.BoomStore.Dtos.Products;
using MB.BoomStore.Utilities.Enums;
using System.ComponentModel.DataAnnotations.Schema;
namespace MB.BoomStore.Dtos.Orders
{
    public class OrderDetailsDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }

        [Column(TypeName = "decimal(12,4)")]
        public decimal TotalPrice { get; set; }
        public string? Note { get; set; }
        public List<OrderProductDto> OrderProducts { get; set; } = [];

        public string CustomerFullName { get; set; }
    }
}
