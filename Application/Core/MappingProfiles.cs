using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Profesori, Profesori>();
            CreateMap<Postimi,Postimi>();
            CreateMap<Lenda,Lenda>();
            CreateMap<Prindi, Prindi>();
            CreateMap<Nxenesi, Nxenesi>();
            CreateMap<Laburatiori, Laburatiori>(); 
            CreateMap<Kontakti, Kontakti>(); 
            CreateMap<Salla, Salla>(); 
            CreateMap<Paralelja, Paralelja>();
            CreateMap<Klasa, Klasa>();
            CreateMap<Orari, Orari>();
            CreateMap<Vleresimi, Vleresimi>();
            CreateMap<Njoftimi, Njoftimi>();
        }
    }
}