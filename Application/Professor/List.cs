using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Professor
{
    public class List
    {
        public class Query : IRequest<List<Profesori>> { }
        public class Handler : IRequestHandler<Query, List<Profesori>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Profesori>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Profesoret.ToListAsync();
            }
        }
    }
}