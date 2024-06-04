namespace MB.BoomStore.Dtos.Pages
{
    public class PagedListDto<T>
    {
        public List<T> Items { get; set; } = [];
        public int Count { get; set; }
    }
}
