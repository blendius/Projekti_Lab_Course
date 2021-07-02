using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Oraret
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid OrariId { get; set; }
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
                var orari = await _context.Oraret.FindAsync(request.OrariId);
                _context.Remove(orari);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}