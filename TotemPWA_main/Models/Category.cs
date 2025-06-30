    // Localização: TotemPWA_main/Models/Category.cs
    using System.Text.Json.Serialization;
    using System.Text.RegularExpressions;
    using System.ComponentModel.DataAnnotations; // Adicione esta linha

    namespace TotemPWA.Models
    {
        public class Category
        {
            public int Id { get; set; }

            private string _name = string.Empty;

            [Required(ErrorMessage = "O nome da categoria é obrigatório.")]
            [StringLength(100, ErrorMessage = "O nome não pode exceder 100 caracteres.")]
            public required string Name
            {
                get => _name;
                set
                {
                    _name = value;
                    Slug = GenerateSlug(value);
                }
            }

            [StringLength(100, ErrorMessage = "O slug não pode exceder 100 caracteres.")]
            public string Slug { get; private set; } = string.Empty;

            [Required(ErrorMessage = "O ícone da categoria é obrigatório.")]
            public required string Icon { get; set; }

            public int? ParentCategoryId { get; set; }

            [JsonIgnore]
            public Category? ParentCategory { get; set; }

            public ICollection<Category> Subcategories { get; set; } = new List<Category>();
            public ICollection<Product> Products { get; set; } = new List<Product>(); // Certifique-se de ter um modelo Product se for usar

            [Display(Name = "Ativa")]
            public bool Active { get; set; }

            public Category()
            {
                Subcategories = new List<Category>();
                Products = new List<Product>();
                Active = true; // Por padrão, novas categorias são ativas
            }

            private static string GenerateSlug(string text)
            {
                text = text.ToLowerInvariant().Trim();
                text = Regex.Replace(text, @"[^a-z0-9\s-]", "");
                text = Regex.Replace(text, @"\s+", "-");
                text = Regex.Replace(text, @"-+", "-").Trim('-');
                return text;
            }
        }
    }