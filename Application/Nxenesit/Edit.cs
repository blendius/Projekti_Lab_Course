using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using AutoMapper;

namespace Application.Nxenesit

{
    public class Edit
    {
        public class Command : IRequest
        {
            public Nxenesi Nxenesi { get; set; }
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
                var nxenesi = await _context.Nxenesit.FindAsync(request.Nxenesi.Id);
                _mapper.Map(request.Nxenesi, nxenesi);
                
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}