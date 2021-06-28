using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Klasat
{
    public class List
    {
        public class Query : IRequest<List<Klasa>> { }
        public class Handler : IRequestHandler<Query, List<Klasa>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Klasa>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Klasat.ToListAsync();
            }
        }
    }
}