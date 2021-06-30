using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Oraret
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Orari Orari { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var orari = await _context.Oraret.FindAsync(request.Orari.OrariId);

                _mapper.Map(request.Orari, orari);

                await _context.SaveChangesAsync();

                return Unit.Value;

            }
        }
    }
}