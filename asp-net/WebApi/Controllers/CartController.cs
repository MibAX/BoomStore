using AutoMapper;
using MB.BoomStore.Dtos.Carts;
using MB.BoomStore.Dtos.Orders;
using MB.BoomStore.EfCore;
using MB.BoomStore.Entities.Orders;
using MB.BoomStore.Utilities.Enums;
using Microsoft.AspNetCore.Mvc;

namespace MB.BoomStore.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        #region Data and Const

        private readonly BoomStoreDbContext _context;
        private readonly IMapper _mapper;

        public CartController(BoomStoreDbContext context, IMapper mapper)
        {
            _context = context;
            this._mapper = mapper;
        }

        #endregion

        #region Actions

        //[HttpPost]
        //public async Task<IActionResult> AddToCart(CartProductDto cartProductDto)
        //{
        //    var cart = await GetCart();

        //    var orderProduct = new OrderProduct()
        //    {
        //        OrderId = cart.Id,

        //    }

        //    cart.OrderProducts.Add()
        //}

        #endregion

        #region Private Methods

        //public async Task<Order> GetCart()
        //{
        //    var cart = await GetOpenCart();

        //    if (cart == null)
        //    {
        //        cart = await CreateCart();
        //    }

        //    return cart;
        //}

        //private async Task<Order> GetOpenCart()
        //{
        //    var cart = await _context
        //                        .Orders
        //                        .Where(o => o.OrderStatus == OrderStatus.Pending)
        //                        .SingleOrDefaultAsync();

        //    return cart;
        //}

        //private async Task<Order> CreateCart()
        //{
        //    var cart = new Order()
        //    {
        //        CustomerId = LOGGED_IN_USER_ID
        //    };

        //    await _context.AddAsync(cart);
        //    await _context.SaveChangesAsync();

        //    return cart;
        //}

        #endregion
    }
}
