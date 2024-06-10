using AutoMapper;
using MB.BoomStore.Dtos.Customers;
using MB.BoomStore.Entities.Customers;

namespace MB.BoomStore.WebApi.AutoMapperProfiles
{
    public class CustomerAutoMapperProfile : Profile
    {
        public CustomerAutoMapperProfile()
        {
            CreateMap<Customer, CustomerDto>();
            CreateMap<Customer, CustomerDetailsDto>();
            CreateMap<Customer, CreateUpdateCustomerDto>().ReverseMap();
        }
    }
}
