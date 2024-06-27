using AutoMapper;
using MB.BoomStore.Dtos.Carts;
using MB.BoomStore.Entities.Carts;

namespace MB.BoomStore.WebApi.AutoMapperProfiles
{
    public class CartAutoMapperProfile : Profile
    {
        public CartAutoMapperProfile()
        {
            CreateMap<CartItemInputDto, CartItem>();
            CreateMap<Cart, CartDto>();
            CreateMap<CartItem, CartItemDto>();
        }
    }
}
