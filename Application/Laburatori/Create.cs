using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Laburatori
{
    public class Create
    {
        public class Command : IRequest
        {
            public Laburatiori Laburatiori { get; set; }
            public Guid lendaId { get; set; }
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
                var lenda =await _context.Lendet.FirstOrDefaultAsync(x => x.LendaId == request.lendaId);

                request.Laburatiori.Lenda= lenda;

                _context.Laburatioret.Add(request.Laburatiori);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }


}

