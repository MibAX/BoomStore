using AutoMapper;
using MB.BoomStore.Dtos.Orders;
using MB.BoomStore.Entities.Orders;

namespace MB.BoomStore.WebApi.AutoMapperProfiles
{
    public class OrderAutoMapperProfile : Profile
    {
        public OrderAutoMapperProfile()
        {
            CreateMap<Order, OrderDto>();
            CreateMap<Order, OrderDetailsDto>();


            CreateMap<Order, CreateUpdateOrderDto>().ReverseMap();

            CreateMap<OrderProduct, OrderProductDto>()
                .ForMember(orderProductDto => orderProductDto.TotalPrice, opts =>
                    opts.MapFrom(orderProduct => orderProduct.Product.Price * orderProduct.Quantity));

        }
    }
}
