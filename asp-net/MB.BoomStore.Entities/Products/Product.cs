using MB.BoomStore.Entities.Categories;
using MB.BoomStore.Entities.Orders;
using System.ComponentModel.DataAnnotations.Schema;

namespace MB.BoomStore.Entities.Products
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string BarCode { get; set; }
        public int Rating { get; set; } = 0;


        [Column(TypeName = "decimal(6,2)")] 
        public decimal Price { get; set; }

        public int CategoryId { get; set; }
        public required Category Category { get; set; }

        public List<OrderProduct> OrderProducts { get; set; } = [];

        public string ImageName { get; set; }

        //public Review Review { get; set; }
    }
}
