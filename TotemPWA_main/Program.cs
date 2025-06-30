using Microsoft.EntityFrameworkCore;
using TotemPWA.Data;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=totem.sqlite"));


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    //context.Database.EnsureDeleted(); // CUIDADO: Descomentar esta linha APAGA o banco de dados a cada inicialização!
    //context.Database.Migrate();      // Garante que o banco de dados está atualizado com as últimas migrações
    //await DbInitializer.InitializeAsync(context); // Se você estiver usando o DbInitializer para seed inicial
                                                    // Certifique-se de que este arquivo existe e está correto
                                                    // e se não tiver, comente esta linha.
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
