using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Klasat
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid KlasaId { get; set; }

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
                var klasa = await _context.Klasat.FindAsync(request.KlasaId);
                _context.Remove(klasa);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}