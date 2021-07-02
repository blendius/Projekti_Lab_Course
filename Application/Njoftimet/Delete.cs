using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Njoftimet
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid NjoftimiId{ get; set; }
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
                var njoftimi = await _context.Njoftimet.FindAsync(request.NjoftimiId);
                _context.Remove(njoftimi);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}