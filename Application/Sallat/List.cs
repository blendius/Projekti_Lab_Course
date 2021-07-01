using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Sallat
{
    public class List
    {
        public class Query : IRequest<List<Salla>> { }
        public class Handler : IRequestHandler<Query, List<Salla>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Salla>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Sallat.ToListAsync();
            }
        }
    }
}