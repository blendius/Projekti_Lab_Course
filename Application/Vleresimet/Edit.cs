using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vleresimet
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Vleresimi Vleresimi { get; set; }
            public string profId { get; set; }
            public string nxenesiId { get; set; }
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
                var vleresimi = await _context.Vleresimi.FindAsync(request.Vleresimi.VleresimiId);
                _mapper.Map(request.Vleresimi, vleresimi);
                var prof = await _context.Profesoret.FirstOrDefaultAsync(x => x.Id == request.profId);

                request.Vleresimi.Profesori = prof;
                var nxenesi = await _context.Nxenesit.FirstOrDefaultAsync(x => x.Id == request.nxenesiId);

                request.Vleresimi.Nxenesi = nxenesi;

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}