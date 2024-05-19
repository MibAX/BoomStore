using AutoMapper;
using MB.BoomStore.Dtos.Categories;
using MB.BoomStore.Entities.Categories;

namespace MB.BoomStore.WebApi.AutoMapperProfiles
{
    public class CategoryAutoMapperProfile : Profile
    {
        public CategoryAutoMapperProfile()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Category, CategoryDetailsDto>();

            CreateMap<CreateUpdateCategoryDto, Category>().ReverseMap();

        }
    }
}
