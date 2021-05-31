using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Terminet
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Termini Termini { get; set; }
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
                var termini = await _context.Terminet.FindAsync(request.Termini.Id);

                _mapper.Map(request.Termini,termini);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}