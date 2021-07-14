using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Oraret
{
    public class Create
    {
        public class Command : IRequest
        {
            public Orari Orari { get; set; }
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
                var klasa =await _context.Klasat.FindAsync(request.Orari.KlasaID);

                request.Orari.Klasa= klasa;

                _context.Oraret.Add(request.Orari);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}