using AutoMapper;
using MB.BoomStore.Dtos.Products;
using MB.BoomStore.Entities.Products;

namespace MB.BoomStore.WebApi.AutoMapperProfiles
{
    public class ProductAutoMapperProfile : Profile
    {
        public ProductAutoMapperProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<Product, ProductDetailsDto>();

            CreateMap<CreateUpdateProductDto, Product>().ReverseMap();

        }
    }
}
