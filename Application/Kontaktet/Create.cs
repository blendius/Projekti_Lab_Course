
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Kontaktet
{

    public class Create
    {
        public class Command : IRequest
        {
            public Kontakti Kontakti { get; set; }
            public string ProfEmail { get; set; }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IPrindiAccessor _prindiAccessor;
            public Handler(DataContext context, IPrindiAccessor prindiAccessor)
            {
                _prindiAccessor = prindiAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var prindi = await _context.Prinderit.FirstOrDefaultAsync(x => x.UserName == _prindiAccessor.GetUsername());

                request.Kontakti.Prindi = prindi;
                var profesori = await _context.Profesoret.FirstOrDefaultAsync(x => x.Email == request.ProfEmail);

                request.Kontakti.Profesori = profesori;

                _context.Kontaktet.Add(request.Kontakti);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }
}