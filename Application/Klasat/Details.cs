using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Klasat
{
    public class Details
    {
        public class Query : IRequest<Klasa>
        {
            public int VitiId { get; set; }
            public int ParaleljaId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Klasa>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Klasa> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Klasat.FindAsync(request.VitiId, request.ParaleljaId);
            }
        }
    }
}