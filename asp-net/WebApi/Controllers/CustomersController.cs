using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.BoomStore.EfCore;
using MB.BoomStore.Entities.Customers;
using AutoMapper;
using MB.BoomStore.Dtos.Customers;

namespace MB.BoomStore.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {

        #region Data and Const

        private readonly BoomStoreDbContext _context;
        private readonly IMapper _mapper;

        public CustomersController(BoomStoreDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomers()
        {
            var customers = await _context
                                    .Customers
                                    //.Select(c => _mapper.Map<CustomerDto>(c))
                                    .ToListAsync();

            var customersDto = _mapper.Map<List<CustomerDto>>(customers);

            return Ok(customersDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDetailsDto>> GetCustomer(int id)
        {
            var customer = await _context
                                    .Customers
                                    .Include(c => c.Orders)
                                    .Where(c => c.Id == id)
                                    .SingleOrDefaultAsync();

            if (customer == null)
            {
                return NotFound();
            }

            var customerDto = _mapper.Map<CustomerDetailsDto>(customer);

            return customerDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateCustomerDto>> GetCustomerForEdit(int id)
        {
            var customer = await _context
                                    .Customers
                                    .Where(c => c.Id == id)
                                    .SingleOrDefaultAsync();

            if (customer == null)
            {
                return NotFound();
            }

            var customerDto = _mapper.Map<CreateUpdateCustomerDto>(customer);

            return customerDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCustomer(int id, CreateUpdateCustomerDto createUpdateCustomerDto)
        {
            if (id != createUpdateCustomerDto.Id)
            {
                return BadRequest();
            }

            var customer = await _context.Customers.FindAsync(id);

            _mapper.Map(createUpdateCustomerDto, customer);

            if (customer == null)
            {
                return NotFound();
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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
        public async Task<ActionResult<Customer>> CreateCustomer(CreateUpdateCustomerDto createUpdateCustomerDto)
        {
            var customer = _mapper.Map<Customer>(createUpdateCustomerDto);

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion

        #region Private Methods

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }

        #endregion
    }
}
