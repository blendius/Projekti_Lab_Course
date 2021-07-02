using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Pajisjet
{
    public class Create
    {
        public class Command : IRequest
        {
            public Pajisja Pajisja { get; set; }
            public Guid LaboratoriId { get; set; }
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
                var laboratori =await _context.Laburatioret.FirstOrDefaultAsync(x => x.Id == request.LaboratoriId);

                request.Pajisja.Laburatiori= laboratori;

                _context.Pajisjet.Add(request.Pajisja);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }


}

