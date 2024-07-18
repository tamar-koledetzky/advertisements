using Microsoft.Extensions.DependencyInjection;
using NewsProject.Repository.Entities;
using NewsProject.Repository.Interfaces;
using NewsProject.Repository.Repository;
using Repository.Interfaces;
using Repository.Repository;

namespace NewsProject.Repository
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection service)
        {
            service.AddScoped<ILogin<User>, UserRepository>();
            service.AddScoped<IAd, AdRepository>();

            //service.AddScoped<IRepository<User>, UserRepository>();
            //service.AddScoped<IRepository<Ad>, AdRepository>();
            service.AddScoped<IRepository<Word>, WordRepository>();
            service.AddScoped<IRepository<Category>, CategoryRepository>();
            service.AddScoped<IRepository<WordCategory>, WordCategoryRepository>();
            return service;
        }

    }
}