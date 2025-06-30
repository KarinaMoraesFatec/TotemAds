using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using TotemPWA.Models;
//using TotemPWA.Models.ViewModels;
using TotemPWA.ViewModels;
using TotemPWA.Data;
using Microsoft.EntityFrameworkCore;


namespace TotemPWA.Controllers;

public class HomeController : Controller
{
    private readonly AppDbContext _context;
    private readonly ILogger<HomeController> _logger;

    public HomeController(AppDbContext context, ILogger<HomeController> logger)
    {
        _context = context;
        _logger = logger;
    }


    public IActionResult Index()
    {
        return View();
    }

    public IActionResult ComerOuLevar()
    {
        return View();
    }

    public IActionResult Sobremesas()
    {
        return View();
    }

    public IActionResult CPF()
    {
        return View(new HomeViewModel());
    }


    public IActionResult TeladePagamento()
    {
        return View();
    }

    public IActionResult Cartao()
    {
        return View();
    }

    public IActionResult Pix()
    {
        return View();
    }

    public IActionResult Dinheiro()
    {
        return View();
    }

    public IActionResult Debito()
    {
        return View();
    }

    public IActionResult Credito()
    {
        return View();
    }


    public IActionResult Concluido()
    {
        return View();
    }

    public IActionResult Negado()
    {
        return View();
    }

    public IActionResult Senha()
    {
        return View();
    }

    public IActionResult Combo()
    {
        return View();
    }

    public IActionResult RevisarPedido()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    [HttpGet("Menu/{categorySlug?}/{subcategorySlug?}")]
        public async Task<IActionResult> Menu(string? categorySlug, string? subcategorySlug)
        {
            // 1. Buscar categorias raiz
            var rootCategoriesRaw = await _context.Categories
                .Where(c => c.ParentCategoryId == null)
                .ToListAsync();

            // 2. Slug da categoria ativa (primeira se não especificado)
            var activeCategorySlug = categorySlug ?? rootCategoriesRaw.FirstOrDefault()?.Slug;

            // 3. Montar categorias raiz para o ViewModel
            var rootCategories = rootCategoriesRaw
                .Select(c => new CategoryItemViewModel
                {
                    Name = c.Name,
                    Slug = c.Slug,
                    Icon = c.Icon,
                    Active = c.Slug == activeCategorySlug
                })
                .ToList();

            // 4. Buscar ID da categoria ativa
            var activeCategory = await _context.Categories
                .FirstOrDefaultAsync(c => c.Slug == activeCategorySlug && c.ParentCategoryId == null);

            if (activeCategory == null)
            {
                return NotFound("Categoria não encontrada.");
            }

            // 5. Buscar subcategorias com base na categoria ativa
            var subcategoriesRaw = await _context.Categories
                .Where(c => c.ParentCategoryId == activeCategory.Id)
                .ToListAsync();

            // 6. Slug da subcategoria ativa
            var activeSubcategorySlug = subcategoriesRaw.Any(c => c.Slug == subcategorySlug)
                ? subcategorySlug
                : subcategoriesRaw.FirstOrDefault()?.Slug;

            // 7. Montar subcategorias para o ViewModel
            var subcategories = subcategoriesRaw
                .Select(c => new CategoryItemViewModel
                {
                    Name = c.Name,
                    Slug = c.Slug,
                    Icon = c.Icon,
                    Active = c.Slug == activeSubcategorySlug
                })
                .ToList();

            // 8. Buscar produtos da subcategoria ativa
            var activeSubcategory = await _context.Categories
                .FirstOrDefaultAsync(c => c.Slug == activeSubcategorySlug && c.ParentCategoryId == activeCategory.Id);

            var products = activeSubcategory != null
                ? await _context.Products
                    .Where(p => p.CategoryId == activeSubcategory.Id)
                    .Select(p => new ProductItemViewModel
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Price = p.Price,
                        Image = p.Image
                    })
                    .ToListAsync()
                : new List<ProductItemViewModel>();

            // 9. Criar ViewModel final
            var viewModel = new HomeViewModel
            {
                SelectedCategorySlug = activeCategorySlug,
                SelectedSubcategorySlug = activeSubcategorySlug,
                RootCategories = rootCategories,
                Subcategories = subcategories,
                Products = products
            };

            return View(viewModel);
        }
}
