using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.BoomStore.EfCore;
using MB.BoomStore.Entities.Categories;
using AutoMapper;
using MB.BoomStore.Dtos.Categories;
using MB.BoomStore.Dtos.Lookups;
using MB.BoomStore.Dtos.Pages;

namespace MB.BoomStore.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        #region Data and Const

        private readonly BoomStoreDbContext _context;
        private readonly IMapper _mapper;

        public CategoriesController(BoomStoreDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _context
                                        .Categories
                                        .ToListAsync();

            var categoryDtos = _mapper.Map<List<CategoryDto>>(categories);

            return categoryDtos;
        }

        [HttpGet]
        public async Task<ActionResult<PagedListDto<CategoryDto>>> GetPagedCategories([FromQuery] ListInputDto listInputDto)
        {
            // How pager works?
            // E.g.: if page size is 10 and page index is 1 (second page because it is ZERO based index)

            var categories = await _context
                                        .Categories
                                        .OrderBy(c => c.Name)
                                        .Skip(listInputDto.PageSize * listInputDto.PageIndex) // pageSize X pageIndex => 10 x 1 = skip 10 categories
                                        .Take(listInputDto.PageSize) // take 10 so => 11-20
                                        .ToListAsync();

            var pagedList = new PagedListDto<CategoryDto>();
            pagedList.Items = _mapper.Map<List<CategoryDto>>(categories);
            pagedList.TotalItems = await _context.Categories.CountAsync();

            return pagedList;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDetailsDto>> GetCategory(int id, bool includeDetails = true)
        {
            var query = _context
                            .Categories
                            .Where(c => c.Id == id);


            if (includeDetails)
            {
                query = query
                        .Include(c => c.Products);
            }

            var category = await query.SingleOrDefaultAsync();



            if (category == null)
            {
                return NotFound();
            }

            var categoryDto = _mapper.Map<CategoryDetailsDto>(category);

            return categoryDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreateUpdateCategoryDto>> GetCategoryForEdit(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            var createUpdateCategoryDto = _mapper.Map<CreateUpdateCategoryDto>(category);

            return createUpdateCategoryDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCategory(int id, CreateUpdateCategoryDto createUpdateCategoryDto)
        {
            if (id != createUpdateCategoryDto.Id)
            {
                return BadRequest();
            }

            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            _mapper.Map(createUpdateCategoryDto, category);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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
        public async Task<IActionResult> CreateCategory(CreateUpdateCategoryDto createUpdateCategoryDto)
        {
            var category = _mapper.Map<Category>(createUpdateCategoryDto);

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<IEnumerable<LookupDto>> GetCategoryLookup()
        {
            var categories = await _context
                                        .Categories
                                        .Include(c => c.Products)
                                        .ToListAsync(); // You go the data from the DB in the memory now


            // You are dealing with data that is IN THE Memory and NOT in DB
            var categoryLookup = categories
                                    .Select(c => new LookupDto()
                                    {
                                        Id = c.Id,
                                        Name = $"{c.Name} - {c.Description}",
                                    });

            return categoryLookup;
        }


        [HttpGet]
        public async Task<IEnumerable<LookupDto>> GetCategoryLookupFromDB()
        {
            // This is getting ONLY the required properties (columns) from DB
            var categoryLookup = await _context
                                        .Categories
                                        .Select(c => new LookupDto() { 
                                            Id = c.Id,
                                            Name = $"{c.Name} - {c.Description}",
                                        })
                                        .ToListAsync();

            return categoryLookup;
        }

        #endregion

        #region Private Functions

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }

        #endregion
    }
}
