using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Familjet
{
    public class List
    {
        public class Query : IRequest<List<Familja>> { }
        public class Handler : IRequestHandler<Query, List<Familja>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Familja>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Familjet.ToListAsync();
            }
        }
    }
}