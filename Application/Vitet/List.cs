using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vitet
{
    public class List
    {
        public class Query : IRequest<List<Viti>> { }
        public class Handler : IRequestHandler<Query, List<Viti>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Viti>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Vitet.ToListAsync();
            }
        }
    }
}