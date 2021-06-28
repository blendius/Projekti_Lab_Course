using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Paralelet
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Paralelja Paralelja { get; set; }
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
                var paralelja = await _context.Paralelet.FindAsync(request.Paralelja.ParaleljaId);
                _mapper.Map(request.Paralelja, paralelja);
                
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}