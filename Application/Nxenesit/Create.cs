using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Nxenesit
{
    public class Create
    {
        public class Command : IRequest
        {
            public Nxenesi Nxenesi { get; set; }
            // public Prindi Prind
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Nxenesit.Add(request.Nxenesi);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}