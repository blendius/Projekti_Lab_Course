using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Professor
{
    public class Details
    {
        public class Query : IRequest<Profesori>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Profesori>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Profesori> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Profesoret.FindAsync(request.Id);
            }
        }
    }
}