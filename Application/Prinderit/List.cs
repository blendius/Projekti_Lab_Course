using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Prinderit
{
    public class List
    {
        public class Query : IRequest<List<Prindi>> { }
        public class Handler : IRequestHandler<Query, List<Prindi>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Prindi>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Prinderit.ToListAsync();
            }
        }
    }
}