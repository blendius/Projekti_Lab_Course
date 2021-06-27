using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Vitet
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Viti Viti { get; set; }
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
                var viti = await _context.Vitet.FindAsync(request.Viti.VitiId);
                _mapper.Map(request.Viti, viti);
                
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}