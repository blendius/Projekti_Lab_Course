using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Autobusat
{
    public class List
    {
        public class Query : IRequest<List<Autobusi>>{}

        public class Handler : IRequestHandler<Query, List<Autobusi>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Autobusi>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                return await _context.Autobusat.ToListAsync();
            }
        }
    }
}