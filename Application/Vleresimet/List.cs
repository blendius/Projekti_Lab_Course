using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Vleresimet
{
    public class List
    {
        public class Query : IRequest<List<Vleresimi>> { }
        public class Handler : IRequestHandler<Query, List<Vleresimi>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Vleresimi>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Vleresimi.ToListAsync();
            }
        }
    }
}