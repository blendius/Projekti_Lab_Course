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
            CreateMap<FeedbackToNxenesi, FeedbackToNxenesi>();
            CreateMap<Laburatiori, Laburatiori>(); 
            CreateMap<Kontakti, Kontakti>(); 
            CreateMap<Salla, Salla>(); 
            CreateMap<Paralelja, Paralelja>();
            CreateMap<Klasa, Klasa>();
            CreateMap<Orari, Orari>();
            CreateMap<Vleresimi, Vleresimi>();
            CreateMap<Njoftimi, Njoftimi>();
            CreateMap<Pajisja,Pajisja>();
            CreateMap<Libri, Libri>();
            CreateMap<Aktiviteti,Aktiviteti>();
        }
    }
}