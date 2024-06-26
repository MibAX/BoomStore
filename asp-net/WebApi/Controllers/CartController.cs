using AutoMapper;
using MB.BoomStore.Dtos.Carts;
using MB.BoomStore.Dtos.Orders;
using MB.BoomStore.EfCore;
using MB.BoomStore.Entities.Carts;
using MB.BoomStore.Entities.Orders;
using MB.BoomStore.Utilities.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MB.BoomStore.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        #region Data and Const

        // FOR TESTING ONLY, logged in user is usually taken from the login 
        private const int LOGGED_IN_USER_ID = 1;



        private readonly BoomStoreDbContext _context;
        private readonly IMapper _mapper;

        public CartController(BoomStoreDbContext context, IMapper mapper)
        {
            _context = context;
            this._mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpPost]
        public async Task<IActionResult> AddToCart(CartItemDto cartItemDto)
        {
            var cart = await GetCart();

            var cartItem = _mapper.Map<CartItem>(cartItemDto);

            await AddProductPriceToCart(cart, cartItemDto);

            cart.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return Ok();
        }

        #endregion

        #region Private Methods

        private async Task<Cart> GetCart()
        {
            var cart = await _context
                                .Carts
                                .Where(cart => cart.CartStatus == CartStatus.Open)
                                .SingleOrDefaultAsync();

            if (cart == null)
            {
                cart = await CreateCart();
            }

            return cart;
        }

        private async Task<Cart> CreateCart()
        {
            // Create a new Cart and return it
            var cart = new Cart()
            {
                CustomerId = LOGGED_IN_USER_ID,
                CartStatus = CartStatus.Open
            };

            await _context.AddAsync(cart);
            await _context.SaveChangesAsync();

            return cart;
        }

        private async Task AddProductPriceToCart(Cart cart, CartItemDto cartItemDto)
        {
            var productPrice = await _context
                                        .Products
                                        .Where(p => p.Id == cartItemDto.ProductId)
                                        .Select(p => p.Price)
                                        .SingleAsync();

            var productTotalPrice = productPrice * cartItemDto.Quantity;

            cart.TotalPrice += productTotalPrice;
        }

        #endregion
    }
}
