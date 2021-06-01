using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Parent
{
    public class Details
    {
        public class Query : IRequest<Prindi>
        {
            public Guid Id { get; set; }
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