using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Prinderit
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
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
               var prindi = await _context.Prinderit.FindAsync(request.Id);
               _context.Remove(prindi);

               await _context.SaveChangesAsync();
               return Unit.Value;
            }
        }
    }
}