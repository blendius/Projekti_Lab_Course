using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Nxenesit
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            public readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var nxenesi = await _context.Nxenesit.FindAsync(request.Id);
                _context.Remove(nxenesi);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}