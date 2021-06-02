using System;
using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Klubet
{
    public class List
    {
        public class Query : IRequest<List<Klubi>> { }
        public class Handler : IRequestHandler<Query, List<Klubi>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Klubi>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Klubet.ToListAsync();
            }
        }
    }
}