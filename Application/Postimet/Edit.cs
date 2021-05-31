using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Postimet
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Postimi Postimi { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context,IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var postimi = await _context.Postimet.FindAsync(request.Postimi.Id);

                _mapper.Map(request.Postimi,postimi);

                await _context.SaveChangesAsync();

                return Unit.Value;

            }
        }
    }
}