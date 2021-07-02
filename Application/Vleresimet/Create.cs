using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vleresimet
{
    public class Create
    {
        public class Command : IRequest
        {
            public Vleresimi Vleresimi { get; set; }
            public string profId { get; set; }
            public string nxenesiId { get; set; }
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
                var prof = await _context.Profesoret.FirstOrDefaultAsync(x => x.Id == request.profId);

                request.Vleresimi.Profesori = prof;
                var nxenesi = await _context.Nxenesit.FirstOrDefaultAsync(x => x.Id == request.nxenesiId);

                request.Vleresimi.Nxenesi = nxenesi;

                _context.Vleresimi.Add(request.Vleresimi);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}