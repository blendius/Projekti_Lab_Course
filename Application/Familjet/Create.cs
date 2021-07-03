using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Familjet
{
    public class Create
    {
        public class Command : IRequest
        {
            public Familja Familja { get; set; }
            public string PrindiId { get; set; }
            public string NxenesiId { get; set; }
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
                var prindi = await _context.Prinderit.FirstOrDefaultAsync(x => x.Id == request.PrindiId);
                request.Familja.Prindi = prindi;

                var nxenesi = await _context.Nxenesit.FirstOrDefaultAsync(x => x.Id == request.NxenesiId);
                request.Familja.Nxenesi = nxenesi;

                _context.Familjet.Add(request.Familja);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}