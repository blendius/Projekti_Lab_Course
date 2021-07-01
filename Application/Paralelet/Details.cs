using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Paralelet
{
    public class Details
    {
        public class Query : IRequest<Paralelja>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Paralelja>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Paralelja> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Paralelet.FindAsync(request.Id);
            }
        }
    }
}