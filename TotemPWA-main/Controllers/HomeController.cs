using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using TotemPWA.Models;

namespace TotemPWA.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
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

    public IActionResult Tela2()
    {
        return View();
    }

    public IActionResult Sobremesas()
    {
        return View();
    }

    public IActionResult CPF()
    {
    return View();
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

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
