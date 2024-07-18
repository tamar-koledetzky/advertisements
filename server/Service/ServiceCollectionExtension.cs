using Microsoft.Extensions.DependencyInjection;
using NewsProject.Common.Entities;
using NewsProject.Repository;
using NewsProject.Service.Interfaces;
using NewsProject.Service.Services;
using NewsProject.Service.Algoritim.Implement;
using NewsProject.Service.Algoritim.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.Interfaces;

namespace NewsProject.Service
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection service)
        {
            service.AddRepositories();
            service.AddScoped<ILoginService, UserService>();
            service.AddScoped<IAdService, AdService>();

            //service.AddScoped<IService<UserDto>, UserService>();
            //service.AddScoped<IService<AdDto>, AdService>();
            service.AddScoped<IAlgo, Algo>();
            service.AddAutoMapper(typeof(MapperProfile));
            return service;
        }

    }
}
