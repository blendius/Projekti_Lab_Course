using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Klasat
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Klasa Klasa { get; set; }
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
                // var viti = await _context.Klasat.FindAsync(request.Klasa.VitiId);
                // var paralelja = await _context.Klasat.FindAsync(request.Klasa.ParaleljaId);

                var klasa = await _context.Klasat.FindAsync(request.Klasa.VitiId, request.Klasa.ParaleljaId);

                _mapper.Map(request.Klasa, klasa);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}