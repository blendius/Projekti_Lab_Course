using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Aktivitetet
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid AktivitetiId { get; set; }
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
                var aktivitet = await _context.Aktivitetet.FindAsync(request.AktivitetiId);
                _context.Remove(aktivitet);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}