using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
namespace Application.Pajisjet
{
    public class Edit
    {

        public class Command : IRequest
        {
            public Pajisja Pajisja { get; set; }
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
                var pajisja = await _context.Pajisjet.FindAsync(request.Pajisja.PajisjaId);
                _mapper.Map(request.Pajisja, pajisja);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
        
