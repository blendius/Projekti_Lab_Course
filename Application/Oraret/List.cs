using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Oraret
{
    public class List
    {
        public class Query : IRequest<List<Orari>>{}

        public class Handler : IRequestHandler<Query, List<Orari>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Orari>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                return await _context.Oraret.ToListAsync();
            }
        }
    }
}