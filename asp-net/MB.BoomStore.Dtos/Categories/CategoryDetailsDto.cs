namespace MB.BoomStore.Dtos.Categories
{
    public class CategoryDetailsDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        //public List<ProductDto> Products { get; set; }
    }
}
