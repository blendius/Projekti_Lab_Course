using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Lendet
{
    public class Details
    {
        public class Query : IRequest<Lenda>
        {
            public Guid LendaId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Lenda>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            
            {
                _context = context;
            }

            public async Task<Lenda> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Lendet.FindAsync(request.LendaId);
            }
        }
    }
}