﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.BoomStore.EfCore;
using MB.BoomStore.Entities.Products;
using AutoMapper;
using MB.BoomStore.Dtos.Products;
using MB.BoomStore.Dtos.Pages;
using MB.BoomStore.Dtos.Lookups;

namespace MB.BoomStore.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        #region Data and Const

        private readonly BoomStoreDbContext _context;
        private readonly IMapper _mapper;

        public ProductsController(BoomStoreDbContext context, IMapper mapper)
        {
            _context = context;
            this._mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts(string? searchKey)
        {

            var query = _context
                                .Products
                                .Include(p => p.Category)
                                .AsQueryable();

            if(string.IsNullOrEmpty(searchKey) == false)
            {
                query = query.Where(p => p.Name.Contains(searchKey));
            }

            var products= await query.ToListAsync();

            var productDtos = _mapper.Map<List<ProductDto>>(products);

            return productDtos;
        }

        [HttpGet]
        public async Task<ActionResult<PagedListDto<ProductDto>>> GetPagedProducts(ListInputDto listInputDto)
        {
            // How pager works?
            // E.g.: if page size is 10 and page index is 1 (second page because it is ZERO based index)

            var products = await _context
                                    .Products
                                    .Include(p => p.Category)
                                    .OrderByDescending(c => c.Price)
                                    .Skip(listInputDto.PageSize * listInputDto.PageIndex) // pageSize X pageIndex => 10 x 1 = skip 10 categories
                                    .Take(listInputDto.PageSize) // take 10 so => 11-20
                                    .ToListAsync();

            var pagedListDto = new PagedListDto<ProductDto>();
            pagedListDto.Items = _mapper.Map<List<ProductDto>>(products);
            pagedListDto.TotalItems = await _context.Products.CountAsync();


            return pagedListDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDetailsDto>> GetProduct(int id)
        {
            var product = await _context
                                    .Products
                                    .Include(p => p.Category)
                                    .Where(p => p.Id == id)
                                    .SingleOrDefaultAsync();

            if (product == null)
            {
                return NotFound();
            }

            var productDetailDto = _mapper.Map<ProductDetailsDto>(product);

            return productDetailDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateProductDto>> GetProductForEdit(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var createUpdateProductDto = _mapper.Map<CreateUpdateProductDto>(product);

            return createUpdateProductDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(int id, CreateUpdateProductDto createUpdateProductDto)

        {
            if (id != createUpdateProductDto.Id)
            {
                return BadRequest();
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _mapper.Map(createUpdateProductDto, product);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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
        public async Task<ActionResult<Product>> CreateProduct(CreateUpdateProductDto createUpdateProductDto)
        {
            var product = _mapper.Map<Product>(createUpdateProductDto);

            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = createUpdateProductDto.Id }, createUpdateProductDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<IEnumerable<LookupDto>> GetProductLookup()
        {
            var productLookup = await _context
                                        .Products
                                        .Select(product => new LookupDto()
                                        {
                                            Id = product.Id,
                                            Name = product.Name
                                        })
                                        .ToListAsync();

            return productLookup;
        }

        #endregion

        #region Private Methods

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }

        #endregion

    }
}
