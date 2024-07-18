using AutoMapper;
using NewsProject.Common.Entities;
using NewsProject.Repository.Entities;

namespace NewsProject.Service
{
    public class MapperProfile:Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Ad, AdDto>().ReverseMap();
        }

    }
}