namespace MB.BoomStore.Dtos.Categories
{
    public class CreateUpdateCategoryDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
    }
}
