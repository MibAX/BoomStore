using MB.BoomStore.Entities.Products;

namespace MB.BoomStore.Entities.Categories
{
    public class Category
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }

        public List<Product> Products { get; set; } = [];
    }
}