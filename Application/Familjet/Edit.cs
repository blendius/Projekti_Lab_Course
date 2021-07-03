using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Familjet
{
    public class Edit
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var familja = await _context.Familjet.FindAsync(request.Familja.FamiljaId);
                _mapper.Map(request.Familja, familja);

                var prindi = await _context.Prinderit.FirstOrDefaultAsync(x => x.Id == request.PrindiId);
                request.Familja.Prindi = prindi;

                var nxenesi = await _context.Nxenesit.FirstOrDefaultAsync(x => x.Id == request.NxenesiId);
                request.Familja.Nxenesi = nxenesi;

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}