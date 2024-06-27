﻿using AutoMapper;
using MB.BoomStore.Dtos.Carts;
using MB.BoomStore.EfCore;
using MB.BoomStore.Entities.Carts;
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


        [HttpGet]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var cart = await _context
                                    .Carts
                                    .Include(o => o.CartItems)
                                        .ThenInclude(ci => ci.Product)
                                            .ThenInclude(p => p.Category)
                                    .Where(c => c.CartStatus == CartStatus.Open)
                                    .SingleOrDefaultAsync();

            if (cart == null)
            {
                cart = new Cart();
            }

            var cartDto = _mapper.Map<CartDto>(cart);

            return cartDto;
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart(CartItemInputDto cartItemDto)
        {
            var cart = await GetOpenCart();

            var cartItem = _mapper.Map<CartItem>(cartItemDto);

            await AddProductPriceToCart(cart, cartItemDto);

            cart.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return Ok();
        }

        #endregion

        #region Private Methods

        private async Task<Cart> GetOpenCart()
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

        private async Task AddProductPriceToCart(Cart cart, CartItemInputDto cartItemDto)
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