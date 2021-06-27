using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Vitet
{
    public class Details
    {
        public class Query : IRequest<Viti>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Viti>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Viti> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Vitet.FindAsync(request.Id);
            }
        }
    }
}