using Microsoft.AspNetCore.Mvc.Rendering;
using TotemPWA.Models;
using System.Collections.Generic;

namespace TotemPWA.ViewModels
{
    public class CategoryViewModel
    {
        public Category Category { get; set; }
        public List<SelectListItem> Categories { get; set; }

        public CategoryViewModel()
        {
            // Inicialize a Category e atribua valores às propriedades 'required'.
            // string.Empty ou "" são aceitáveis para campos de texto que serão preenchidos pelo usuário.
            Category = new Category
            {
                Name = string.Empty, // <--- Adicione esta linha
                Icon = string.Empty  // <--- Adicione esta linha
                // 'Active' já é inicializada pelo construtor de Category, se você a definiu lá.
            };
            Categories = new List<SelectListItem>();
        }
    }
}