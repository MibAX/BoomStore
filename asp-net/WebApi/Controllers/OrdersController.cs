using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.BoomStore.EfCore;
using MB.BoomStore.Entities.Orders;
using AutoMapper;
using MB.BoomStore.Dtos.Orders;

namespace MB.BoomStore.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        #region Data and Const

        private readonly BoomStoreDbContext _context;
        private readonly IMapper _mapper;

        public OrdersController(BoomStoreDbContext context, IMapper mapper)
        {
            _context = context;
            this._mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
        {
            var orders = await _context
                                    .Orders
                                    .ToListAsync();

            var orderDtos = _mapper.Map<List<OrderDto>>(orders);

            return orderDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetailsDto>> GetOrder(int id)
        {
            var order = await _context
                                .Orders
                                .Include(o => o.OrderProducts)
                                    .ThenInclude(op => op.Product)
                                .Where(o => o.Id == id)
                                .SingleOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            var orderDetailsDto = _mapper.Map<OrderDetailsDto>(order);

            return orderDetailsDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateOrderDto>> GetOrderForEdit(int id)
        {
            var order = await _context
                                .Orders
                                .Where(o => o.Id == id)
                                .SingleOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            var orderDetailsDto = _mapper.Map<CreateUpdateOrderDto>(order);

            return orderDetailsDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditOrder(int id, CreateUpdateOrderDto createUpdateOrderDto)
        {
            if (id != createUpdateOrderDto.Id)
            {
                return BadRequest();
            }

            _context.Entry(createUpdateOrderDto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateUpdateOrderDto createUpdateOrderDto)
        {
            var order = _mapper.Map<Order>(createUpdateOrderDto);

            order.OrderDate = DateTime.Now;

            await UpdateOrderProductsAsync(order.Id, createUpdateOrderDto.OrderProducts);

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion

        #region Private Methods

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }

        private async Task UpdateOrderProductsAsync(int orderId, List<OrderProductDto> orderProductsDto)
        {
            var order = await _context
                                .Orders
                                .Include(o => o.OrderProducts)
                                    .ThenInclude(op => op.Product)
                                .Where(o => o.Id == orderId)
                                .SingleAsync();

            order.OrderProducts.Clear();

            var productIds = orderProductsDto.Select(op => op.ProductId).ToList();

            var products = await _context
                                    .Products
                                    .Where(p => productIds.Contains(p.Id))
                                    .ToListAsync();

            foreach (var product in products)
            {
                var orderProduct = new OrderProduct()
                {
                    Order = order,
                    Product = product,
                    Quantity = orderProductsDto.Where(op => op.ProductId == product.Id).Select(op => op.Quantity).Single()
                };

                order.OrderProducts.Add(orderProduct);
            }
        }

        #endregion
    }
}
