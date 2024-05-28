﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.BoomStore.EfCore;
using MB.BoomStore.Entities.Categories;
using AutoMapper;
using MB.BoomStore.Dtos.Categories;

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

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDetailsDto>> GetCategory(int id)
        {
            var category = await _context
                                    .Categories
                                    .Include(c => c.Products)
                                    .Where(c => c.Id == id)
                                    .SingleOrDefaultAsync();

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

        #endregion

        #region Private Functions

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        } 

        #endregion
    }
}
