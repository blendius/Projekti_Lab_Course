using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Autobusat
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid AutobusiId { get; set; }
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
                var autobusi = await _context.Autobusat.FindAsync(request.AutobusiId);
                _context.Remove(autobusi);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}