using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Terminet
{
    public class List
    {
        public class Query : IRequest<Result<List<Termini>>>{}
        public class Handler : IRequestHandler<Query, Result<List<Termini>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Termini>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Termini>>.Success( await _context.Terminet.ToListAsync());
            }
        }
    }
}