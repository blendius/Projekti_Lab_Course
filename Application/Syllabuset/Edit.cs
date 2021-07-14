using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Syllabuset
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Syllabusi Syllabusi { get; set; }
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
                var syllabusi = await _context.Syllabuset.FindAsync(request.Syllabusi.SyllabusiId);
                _mapper.Map(request.Syllabusi, syllabusi);
                
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}