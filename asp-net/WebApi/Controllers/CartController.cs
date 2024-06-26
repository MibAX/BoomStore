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

            AddOrUpdateQuantity(cart, cartItemDto);

            await _context.SaveChangesAsync();

            await UpdateCartTotalPrice();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task RemoveFromCart(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);

            if (cartItem != null)
            {
                _context.CartItems.Remove(cartItem);
                await _context.SaveChangesAsync();

                await UpdateCartTotalPrice();
            }




            // OLD CODE: it ONLY removes the cart item from the cart WITHOUT deleting it 
            // from the DB
            //var cart = await GetOpenCart();

            //var productToRemove = cart.CartItems.Find(c => c.Id == id);

            //if(productToRemove != null)
            //{
            //    cart.CartItems.Remove(productToRemove);
            //    await _context.SaveChangesAsync();
            //}
        }

        [HttpGet]
        public async Task Checkout()
        {
            var cart = await GetOpenCart();

            cart.CartStatus = CartStatus.CheckedOut;

            await _context.SaveChangesAsync();
        }

        #endregion

        #region Private Methods

        private async Task<Cart> GetOpenCart()
        {
            var cart = await _context
                                .Carts
                                .Include(o => o.CartItems)
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

        private void AddOrUpdateQuantity(Cart cart, CartItemInputDto cartItemDto)
        {
            // TO DO check if product is ALREADY in the cart. If so
            // increase the amount, otherwise add it
            if (cart.CartItems.Any(ci => ci.ProductId == cartItemDto.ProductId))
            {
                var cartItem = cart.CartItems.Find(ci => ci.ProductId == cartItemDto.ProductId);
                ++cartItem.Quantity;
            }
            else
            {

                var cartItem = _mapper.Map<CartItem>(cartItemDto);
                cart.CartItems.Add(cartItem);
            }
        }

        private async Task UpdateCartTotalPrice()
        {
            var cart = await _context
                                    .Carts
                                    .Include(o => o.CartItems)
                                        .ThenInclude(ci => ci.Product)
                                    .Where(c => c.CartStatus == CartStatus.Open)
                                    .SingleOrDefaultAsync();

            if (cart != null)
            {
                cart.TotalPrice = cart.CartItems.Sum(ci => ci.Product.Price * ci.Quantity);
                await _context.SaveChangesAsync();
            }
        }


        #endregion
    }
}
