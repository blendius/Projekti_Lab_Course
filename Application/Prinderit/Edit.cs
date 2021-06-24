using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Prinderit
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Prindi Prindi { get; set; }
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
                var prindi = await _context.Prinderit.FindAsync(request.Prindi.Id);
                _mapper.Map(request.Prindi, prindi);
                
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}