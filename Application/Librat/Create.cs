using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Librat
{
    public class Create
    {
        public class Command : IRequest
        {
            public Libri Libri { get; set; }
            public string LendaEmri { get; set; }
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
                var lenda =await _context.Lendet.FirstOrDefaultAsync(x => x.EmriLendes == request.LendaEmri);

                request.Libri.Lenda= lenda;

                _context.Librat.Add(request.Libri);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}