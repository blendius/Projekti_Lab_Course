using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Klasat
{
    public class Create
    {
        public class Command : IRequest
        {
            public Klasa Klasa { get; set; }
            public Guid ParaleljaId {get; set;}
            public Guid SallaId {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken)
            {
                var salla = await _context.Sallat.FirstOrDefaultAsync(x => x.SallaId == request.SallaId);
                var paralelja = await _context.Paralelet.FirstOrDefaultAsync(x => x.ParaleljaId == request.ParaleljaId);
                request.Klasa.Salla = salla;
                request.Klasa.Paralelja = paralelja;
                _context.Klasat.Add(request.Klasa);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}