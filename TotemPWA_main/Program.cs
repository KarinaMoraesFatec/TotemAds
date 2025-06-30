// Localização: TotemPWA_main/Program.cs
using Microsoft.EntityFrameworkCore;
using TotemPWA.Data;
// using TotemPWA.Web.Extensions; // Descomente se 'MapStaticAssets' e 'WithStaticAssets' estiverem aqui

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews()
    .AddRazorOptions(options =>
    {
        // Limpa os formatos de localização de views padrão para ter controle total.
        options.ViewLocationFormats.Clear();

        // Adiciona os caminhos padrão para views de controladores na raiz (e.g., HomeController -> Views/Home)
        options.ViewLocationFormats.Add("/Views/{1}/{0}.cshtml"); // {1}=ControllerName, {0}=ActionName
        options.ViewLocationFormats.Add("/Views/Shared/{0}.cshtml");

        // *** ADIÇÃO CRUCIAL PARA SUAS VIEWS DENTRO DA PASTA 'Admin' ***
        // Este caminho diz ao View Engine para procurar views para controladores
        // que estão conceitualmente na subpasta 'Admin'.
        // Ex: CategoryController (em Controllers/Admin) procurará views em Views/Admin/Category/
        options.ViewLocationFormats.Add("/Views/Admin/{1}/{0}.cshtml");
        options.ViewLocationFormats.Add("/Views/Admin/Shared/{0}.cshtml"); // Para views compartilhadas específicas de Admin, se tiver.
    });

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=totem.sqlite"));


var app = builder.Build();

// --- INICIALIZAÇÃO E MIGRAÇÃO DO BANCO DE DADOS ---
// Isso garante que o banco de dados seja criado/atualizado com as últimas migrações
// ao iniciar a aplicação. Útil para desenvolvimento.
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        // context.Database.EnsureDeleted(); // CUIDADO: Descomentar esta linha APAGA o banco de dados a cada inicialização!
        
        context.Database.Migrate(); // Aplica todas as migrações pendentes ao iniciar.
        
        // Se você tiver um inicializador de dados (DbInitializer), descomente e certifique-se de que ele exista.
        // await DbInitializer.InitializeAsync(context); 
    }
    catch (Exception ex)
    {
        // Loga qualquer erro que ocorra durante a inicialização/migração do banco de dados.
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocorreu um erro ao inicializar/migrar o banco de dados.");
    }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // ESSENCIAL para servir arquivos estáticos (CSS, JS, imagens)
app.UseRouting();

app.UseAuthorization();

// Se 'MapStaticAssets' é uma extensão que você criou para 'app', mantenha. Caso contrário, remova.
// app.MapStaticAssets(); 

// Mapeia rotas para seus controladores. A ordem importa: rotas mais específicas primeiro.

// Rota para a área administrativa (Controladores na pasta 'Admin').
// Define um padrão onde se o usuário acessar '/Admin' sem mais nada,
// ele será direcionado para CategoryController e a ação List.
app.MapControllerRoute(
    name: "admin", 
    pattern: "Admin/{controller=Category}/{action=List}/{id?}");

// Rota padrão para o resto da aplicação.
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
    // Se 'WithStaticAssets' é uma extensão que se aplica a MapControllerRoute, mantenha.
    // .WithStaticAssets(); 

app.Run();