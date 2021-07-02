using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProfKlasa
{
    public class CreateProfKlasa
    {
        public class Command : IRequest
        {
            public ProfesoriKlasa ProfKlasa { get; set; }
            public Guid KlasaId { get; set; }
            public string ProfesoriId { get; set; }

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
                var prof = await _context.Profesoret.FirstOrDefaultAsync(x => x.Id == request.ProfesoriId);
                var klasa = await _context.Klasat.FirstOrDefaultAsync(x => x.KlasaId == request.KlasaId);

                request.ProfKlasa.Klasa = klasa;
                request.ProfKlasa.Profesori = prof;

                _context.ProfesoriKlasa.Add(request.ProfKlasa);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}