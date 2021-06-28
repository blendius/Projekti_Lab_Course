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
            public int VitiId { get; set; }
            public int ParaleljaId { get; set; }

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
                var viti = await _context.Klasat.FindAsync(request.VitiId);
                var paralelja = await _context.Klasat.FindAsync(request.ParaleljaId);

                var klasa = await _context.Klasat.FindAsync(viti, paralelja);
                _context.Remove(klasa);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}