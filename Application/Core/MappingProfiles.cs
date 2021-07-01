using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Profesori, Profesori>();
            CreateMap<Termini,Termini>();
            CreateMap<Postimi,Postimi>();
            CreateMap<Lenda,Lenda>();
            CreateMap<Prindi, Prindi>();
            CreateMap<Nxenesi, Nxenesi>();
            CreateMap<Laburatiori, Laburatiori>(); 
            CreateMap<Kontakti, Kontakti>(); 
            CreateMap<Viti, Viti>();
            CreateMap<Paralelja, Paralelja>();
            CreateMap<Klasa, Klasa>();
            CreateMap<Vleresimi, Vleresimi>();
        }
    }
}