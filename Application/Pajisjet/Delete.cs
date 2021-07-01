using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
namespace Application.Pajisjet
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid PajisjaId { get; set; }
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
                var pajisja = await _context.Pajisjet.FindAsync(request.PajisjaId);
                _context.Remove(pajisja);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
