using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Prinderit
{
    public class Details
    {
        public class Query : IRequest<Prindi>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Prindi>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Prindi> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Prinderit.FindAsync(request.Id);
            }
        }
    }
}