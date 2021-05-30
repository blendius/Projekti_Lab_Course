using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Terminet
{
    public class List
    {
        public class Query : IRequest<List<Termini>>{}
        public class Handler : IRequestHandler<Query, List<Termini>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Termini>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Terminet.ToListAsync();
            }
        }
    }
}