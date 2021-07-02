using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Njoftimet
{
    public class Edit
    {
         public class Command : IRequest
        {
            public Njoftimi Njoftimi { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            public readonly DataContext _context;
            public readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var njoftimi = await _context.Njoftimet.FindAsync(request.Njoftimi.NjoftimiId);
                _mapper.Map(request.Njoftimi, njoftimi);
                
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}