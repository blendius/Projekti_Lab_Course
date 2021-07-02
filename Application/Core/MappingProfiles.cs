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
            CreateMap<Viti, Viti>();
            CreateMap<Paralelja, Paralelja>();
            CreateMap<Klasa, Klasa>();
            CreateMap<Njoftimi, Njoftimi>();
        }
    }
}