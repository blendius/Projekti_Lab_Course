using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Syllabuset
{
    public class Details
    {
        public class Query : IRequest<Syllabusi>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Syllabusi>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Syllabusi> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Syllabuset.FindAsync(request.Id);
            }
        }
    }
}