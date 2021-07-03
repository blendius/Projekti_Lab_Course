using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Aktivitetet
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Aktiviteti Aktiviteti { get; set; }
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
                var aktiviteti = await _context.Aktivitetet.FindAsync(request.Aktiviteti.AktivitetiId);

                _mapper.Map(request.Aktiviteti, aktiviteti);

                await _context.SaveChangesAsync();

                return Unit.Value;

            }
        }
    }
}