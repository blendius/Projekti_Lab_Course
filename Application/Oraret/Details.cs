using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Oraret
{
    public class Details
    {
        public class Query : IRequest<Orari>
        {
            public Guid OrariId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Orari>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            
            {
                _context = context;
            }

            public async Task<Orari> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Oraret.FindAsync(request.OrariId);
            }
        }
    }
}