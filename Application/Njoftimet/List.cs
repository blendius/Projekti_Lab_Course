using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;

namespace Application.Njoftimet
{
    public class List
    {
        public class Query : IRequest<List<Njoftimi>> { }

        public class Handler : IRequestHandler<Query, List<Njoftimi>>
        {
            public readonly DataContext _context;
            public Handler(DataContext context)
            {
               _context = context;
            }

            public async Task<List<Njoftimi>> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Njoftimet.ToListAsync();
            }
        }

    }
}