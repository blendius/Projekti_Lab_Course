using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Sallat
{
    public class Details
    {
        public class Query : IRequest<Salla>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Salla>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Salla> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Sallat.FindAsync(request.Id);
            }
        }
    }
}