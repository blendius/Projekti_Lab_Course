using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Klasat
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Klasa Klasa { get; set; }
            public Guid ParaleljaId { get; set; }
            public Guid SallaId { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var klasa = await _context.Klasat.FindAsync(request.Klasa.KlasaId);
                var salla = await _context.Sallat.FirstOrDefaultAsync(x => x.SallaId == request.SallaId);
                var paralelja = await _context.Paralelet.FirstOrDefaultAsync(x => x.ParaleljaId == request.ParaleljaId);
                request.Klasa.Salla = salla;
                request.Klasa.Paralelja = paralelja;
                
                _mapper.Map(request.Klasa, klasa);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}